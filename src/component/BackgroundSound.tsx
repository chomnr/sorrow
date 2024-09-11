import { useEffect, useRef } from "react";
import { useSound } from "../context/SoundContext";

// Gapless Audio
export function BackgroundSound() {
  const { isSoundOn } = useSound();
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const audioUrl = '/sound/amb_void_loop_3.wav';
  const fadeDuration = 1;

  const playLoopingAudio = (audioBuffer: AudioBuffer) => {
    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    if (context && gainNode) {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;

      source.connect(gainNode);
      gainNode.connect(context.destination);

      gainNode.gain.setValueAtTime(0, context.currentTime); 
      gainNode.gain.linearRampToValueAtTime(1, context.currentTime + fadeDuration);

      source.loop = true;
      source.start(0); 
      sourceRef.current = source; 
    }
  };

  const stopAudio = () => {
    const source = sourceRef.current;
    if (source) {
      source.stop();
      sourceRef.current = null;
    }
  };

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const gainNode = audioContext.createGain(); // Create GainNode
    gainNodeRef.current = gainNode; // Store reference to GainNode
    audioContextRef.current = audioContext;

    const loadAudio = () => {
      const request = new XMLHttpRequest();
      request.open('GET', audioUrl, true); 
      request.responseType = 'arraybuffer';

      request.onload = function() {
        audioContext.decodeAudioData(
          request.response, 
          (buffer) => {
            if (isSoundOn) {
              playLoopingAudio(buffer);
            }
          },
          () => {
            console.error('Failed to decode audio data.');
          }
        );
      };

      request.send(); 
    };
    loadAudio();

    return () => {
      const context = audioContextRef.current;
      const source = sourceRef.current;
      if (context) {
        context.close();
      }
      if (source) {
        source.stop();
      }
    };
  }, [isSoundOn]);

  useEffect(() => {
    if (isSoundOn && audioContextRef.current && sourceRef.current === null) {
      fetch(audioUrl)
        .then(res => res.arrayBuffer())
        .then(buffer => audioContextRef.current?.decodeAudioData(buffer))
        .then(decodedBuffer => {
          if (decodedBuffer) {
            playLoopingAudio(decodedBuffer);
          }
        });
    } else if (!isSoundOn) {
      stopAudio();
    }
  }, [isSoundOn]);

  return <div></div>;
}
