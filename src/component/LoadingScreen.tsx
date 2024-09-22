import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Phase, usePhase } from "../context/PhaseContext";
import { useSound } from "../context/SoundContext";

export function LoadingScreen() {
  const { progress } = useProgress();
  const { phase, setPhase } = usePhase();
  const { toggleSound } = useSound();

  // References
  const ref = {
    screen: useRef<HTMLDivElement>(null),
    box: useRef<HTMLDivElement>(null),
    button: useRef<HTMLDivElement>(null),
    top: useRef<HTMLDivElement>(null),
    left: useRef<HTMLDivElement>(null),
    bottom: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const updateLoader = (
      loaderRef: React.RefObject<HTMLDivElement>,
      isWidth: boolean,
      value: number,
      nextLoaderFn?: () => void
    ) => {
      if (loaderRef.current) {
        const currentValue =
          parseFloat(
            isWidth
              ? loaderRef.current.style.width
              : loaderRef.current.style.height
          ) || 0;
        const newValue = Math.min(currentValue + 1, value);
        if (isWidth) {
          loaderRef.current.style.width = `${newValue}%`;
        } else {
          loaderRef.current.style.height = `${newValue}%`;
        }
        if (newValue < value) {
          updateLoader(loaderRef, isWidth, value, nextLoaderFn);
        } else if (nextLoaderFn) {
          setTimeout(nextLoaderFn, 800);
        }
      }
    };

    const value = Math.min(progress, 100);

    updateLoader(ref.top, true, value, () => {
      updateLoader(ref.right, false, value, () => {
        updateLoader(ref.bottom, true, value, () => {
          updateLoader(ref.left, false, value, () => {
            setPhase(Phase.Loaded);
            if (ref.box.current) ref.box.current.classList.add("finished");
          });
        });
      });
    });

    if (phase === Phase.Begun) {
      let screen = ref.screen.current;
      if (screen) {
        screen.style.display = "none";
      }
    }
  }, [
    phase,
    progress,
    ref.bottom,
    ref.box,
    ref.left,
    ref.right,
    ref.screen,
    ref.top,
    setPhase,
  ]);

  return (
    <div ref={ref.screen} className="loading-screen">
      <div
        ref={ref.box}
        onClick={() => {
          if (phase === Phase.Loaded) {
            // timeout fixes bug where camera messes up when people spam the begin button
            setTimeout(() => {
              setPhase(Phase.Begun);
              let audio = new Audio("/sound/wooshes/sfx_whoosh_4.wav");
              audio.play();
              toggleSound();
            }, 59);
          }
        }}
        className="loading-box"
      >
        {phase === Phase.Loaded ? (
          <>
            <div
              ref={ref.button}
              className="title begin"
              style={{ fontWeight: "400" }}
            >
              BEGIN
            </div>
            <div className="subtitle">S O R R O W</div>
            <div
              ref={ref.top}
              className="loader-top"
              style={{ width: "100%" }}
            ></div>
            <div
              ref={ref.left}
              className="loader-left"
              style={{ height: "100%" }}
            ></div>
            <div
              ref={ref.bottom}
              className="loader-bottom"
              style={{ width: "100%" }}
            ></div>
            <div
              ref={ref.right}
              className="loader-right"
              style={{ height: "100%" }}
            ></div>
          </>
        ) : (
          <>
            <div className="subtitle">PORTFOLIO 2024</div>
            <div className="title">ZELJKO</div>
            <div className="subtitle">SORROW</div>
          </>
        )}

        <div ref={ref.top} className="loader-top"></div>
        <div ref={ref.left} className="loader-left"></div>
        <div ref={ref.bottom} className="loader-bottom"></div>
        <div ref={ref.right} className="loader-right"></div>
      </div>
      {/*
      {phase === Phase.Loaded && (
        <div className="epilepsy-warning">
          W A R N I N G: &nbsp; P H O T O S E N S I T I V I T Y
        </div>
      )}
      */}
    </div>
  );
}
