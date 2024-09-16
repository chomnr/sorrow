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
    if (phase === Phase.Loading) {
      const t = ref.top.current;
      const r = ref.right.current;
      const b = ref.bottom.current;
      const l = ref.left.current;

      if (t && r && b && l) {
        const p = progress;

        if (p >= 0 && p <= 25) {
          t.style.width = `${Math.min(p * 4, 100)}%`;
        } else if (p > 25 && p <= 50) {
          t.style.width = "100%";
          r.style.height = `${Math.min((p - 25) * 4, 100)}%`;
        } else if (p > 50 && p <= 75) {
          r.style.height = "100%";
          b.style.width = `${Math.min((p - 50) * 4, 100)}%`;
        } else if (p > 75 && p <= 100) {
          let lb = ref.box.current;
          if (lb) {
            lb.classList.add("finished");
          }
          t.style.width = "100%";
          r.style.height = "100%";
          b.style.width = "100%";
          l.style.height = "100%";

          setPhase(Phase.Loaded);
        }
      }
    }

    if (phase === Phase.Begun) {
      let screen = ref.screen.current;
      if (screen) {
        screen.style.display = "none";
      }
    }
  }, [
    progress,
    phase,
    ref.top,
    ref.left,
    ref.bottom,
    ref.right,
    ref.box,
    setPhase,
    ref.screen,
  ]);

  return (
    <div ref={ref.screen} className="loading-screen">
      <div
        ref={ref.box}
        onClick={() => {
          if (phase === Phase.Loaded) {
            setPhase(Phase.Begun);
            let audio = new Audio("/sound/wooshes/sfx_whoosh_4.wav");
            audio.play();
            toggleSound();
          }
        }}
        className="loading-box"
      >
        {progress === 100 ? (
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
      <div className="epilepsy-warning">P H O T O S E N S I T I V I T Y &nbsp; W A R N I N G</div>
    </div>
  );
}
