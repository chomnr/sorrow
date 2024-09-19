import { useEffect, useRef } from "react";
import { useSound } from "../context/SoundContext";
import { Phase, usePhase } from "../context/PhaseContext";
import { Howl } from "howler";

// Gapless Audio
export function BackgroundSound() {
  const { isSoundOn } = useSound()
  const { phase } = usePhase()
  const soundRef = useRef<Howl | null>(null)
  useEffect(() => {
    if (isSoundOn && phase !== Phase.Loading && phase !== Phase.Loaded && phase !== Phase.RobotForcefulDisconnect) {
      if (!soundRef.current) {
        const sound = new Howl({
          src: ["/sound/amb_void_loop_3.wav"],
          volume: 0,
          loop: true,
          onload: () => {
            sound.play()
            sound.fade(0, 1, 2000)
          },
        })
        soundRef.current = sound
      }
    }
    if (!isSoundOn || phase === Phase.RobotForcefulDisconnect) {
      if (soundRef.current) {
        soundRef.current.stop()
        soundRef.current = null
      }
    }
  }, [isSoundOn, phase])

  useEffect(() => {
    return () => {
      soundRef.current?.stop()
      soundRef.current = null
    }
  }, [])

  return null
}

/*
export function BackgroundSound() {
  const { isSoundOn } = useSound();
  const { phase } = usePhase();
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const audioUrl = '/sound/amb_void_loop_3.wav';
  const fadeDuration = 1;

  const playLoopingAudio = (audioBuffer: AudioBuffer) => {
    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    if (context && gainNode) {
      const previousSource = sourceRef.current;
      if (previousSource) {
        previousSource.stop();
      }

      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true; // not necessary...

      source.connect(gainNode);
      gainNode.connect(context.destination);

      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, context.currentTime + fadeDuration);

      source.start(0);
      sourceRef.current = source;
    }
  };

  const stopAudio = () => {
    const source = sourceRef.current;
    const gainNode = gainNodeRef.current;
    const context = audioContextRef.current;

    if (source && context && gainNode) {
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + fadeDuration);
      setTimeout(() => {
        source.stop();
        sourceRef.current = null;
      }, fadeDuration * 1000);
    }
  };

  useEffect(() => {
    const resumeAudioContext = async () => {
      const context = audioContextRef.current;
      if (context && context.state === 'suspended') {
        await context.resume();
      }
    };

    const audioContext = new (window.AudioContext)();
    const gainNode = audioContext.createGain();
    gainNodeRef.current = gainNode;
    audioContextRef.current = audioContext;

    const loadAudio = () => {
      const request = new XMLHttpRequest();
      request.open('GET', audioUrl, true);
      request.responseType = 'arraybuffer';

      request.onload = function () {
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

    const handleUserInteraction = async () => {
      await resumeAudioContext();
    };

    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      const context = audioContextRef.current;
      if (context) {
        context.close();
      }
    };
  }, [audioUrl, isSoundOn]);

  useEffect(() => {
    if (phase === Phase.RobotForcefulDisconnect) {
      stopAudio();
    } else if (isSoundOn && !sourceRef.current) {
      fetch(audioUrl)
        .then((res) => res.arrayBuffer())
        .then((buffer) => audioContextRef.current?.decodeAudioData(buffer))
        .then((decodedBuffer) => {
          if (decodedBuffer) {
            playLoopingAudio(decodedBuffer);
          }
        });
    }
  }, [audioUrl, isSoundOn, phase]);

  return <div></div>;
}
*/
