import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Icon } from './Icon';

interface VoiceAssistantProps {
  onClose: () => void;
}

// --- Audio Helpers ---

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error'>('connecting');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Audio Contexts and Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Initialization
  useEffect(() => {
    let mounted = true;

    const startSession = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Initialize Audio Contexts
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
        outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
        
        outputNodeRef.current = outputAudioContextRef.current.createGain();
        outputNodeRef.current.connect(outputAudioContextRef.current.destination);

        // Get User Media
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Connect to Gemini Live
        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            systemInstruction: "You are a helpful financial assistant named Fin. Keep answers concise and helpful. Speak Portuguese.",
          },
          callbacks: {
            onopen: () => {
              if (!mounted) return;
              setStatus('listening');
              
              if (!inputAudioContextRef.current) return;
              
              // Input Stream Setup
              const source = inputAudioContextRef.current.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                if (!mounted) return;
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                
                sessionPromise.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioContextRef.current.destination);
              sessionRef.current = sessionPromise; // Store for cleanup
            },
            onmessage: async (message: LiveServerMessage) => {
               if (!mounted) return;

               // Handle Audio Output
               const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
               if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                  setStatus('speaking');
                  const ctx = outputAudioContextRef.current;
                  
                  // Reset timing if needed
                  nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                  
                  try {
                    const audioBuffer = await decodeAudioData(
                        decode(base64Audio),
                        ctx,
                        24000,
                        1
                    );
                    
                    const source = ctx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(outputNodeRef.current);
                    
                    source.addEventListener('ended', () => {
                        sourcesRef.current.delete(source);
                        // Simple heuristic: if no sources playing, we are listening again
                        if (sourcesRef.current.size === 0 && mounted) {
                            setStatus('listening');
                        }
                    });

                    source.start(nextStartTimeRef.current);
                    nextStartTimeRef.current += audioBuffer.duration;
                    sourcesRef.current.add(source);
                  } catch (err) {
                      console.error("Decoding error", err);
                  }
               }
               
               // Handle Interruption
               if (message.serverContent?.interrupted) {
                   sourcesRef.current.forEach(s => s.stop());
                   sourcesRef.current.clear();
                   nextStartTimeRef.current = 0;
                   setStatus('listening');
               }
            },
            onclose: () => {
                console.log("Session closed");
            },
            onerror: (err) => {
                console.error("Session error", err);
                if (mounted) {
                    setStatus('error');
                    setErrorMsg("Erro na conexão.");
                }
            }
          }
        });

      } catch (e: any) {
        console.error(e);
        if (mounted) {
            setStatus('error');
            setErrorMsg(e.message || "Não foi possível iniciar o assistente.");
        }
      }
    };

    startSession();

    return () => {
      mounted = false;
      // Cleanup
      inputAudioContextRef.current?.close();
      outputAudioContextRef.current?.close();
      
      if (sessionRef.current) {
         sessionRef.current.then((s: any) => s.close());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-in fade-in duration-300">
        
        {/* Visualizer Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-8">
            <div className="flex items-center gap-3 h-32">
                {status === 'speaking' || status === 'listening' ? (
                   <>
                     {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-4 bg-primary rounded-full audio-bar" 
                            style={{ 
                                animationDelay: `${i * 0.1}s`,
                                height: status === 'speaking' ? '80%' : '30%',
                                opacity: status === 'speaking' ? 1 : 0.6
                            }} 
                        />
                     ))}
                   </>
                ) : status === 'error' ? (
                    <Icon name="error" className="text-red-500 text-6xl" />
                ) : (
                    <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                )}
            </div>
            
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {status === 'connecting' && "Conectando..."}
                    {status === 'listening' && "Ouvindo..."}
                    {status === 'speaking' && "Falando..."}
                    {status === 'error' && "Erro"}
                </h2>
                <p className="text-zinc-400">
                    {status === 'error' ? errorMsg : "Converse com o Assistente Finanças Pro"}
                </p>
            </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-sm">
            <button 
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors"
            >
                <Icon name="close" />
                Encerrar
            </button>
        </div>
    </div>
  );
};