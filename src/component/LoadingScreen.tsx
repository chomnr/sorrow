import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { useSound } from "../context/SoundContext";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [ isComplete, setIsComplete ] = useState<boolean>(false);
  const { setLoading } = useLoading();
  const { toggleSound } = useSound();


  const loadingScreen = useRef<HTMLDivElement>(null);
  const loadingBox = useRef<HTMLDivElement>(null);
  const begin = useRef<HTMLDivElement>(null);

  // Loader references
  const tl = useRef<HTMLDivElement>(null); // Top loader
  const ll = useRef<HTMLDivElement>(null); // Left loader
  const bl = useRef<HTMLDivElement>(null); // Bottom loader
  const rl = useRef<HTMLDivElement>(null); // Right loader

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
          setTimeout(nextLoaderFn, 700);
        }
      }
    };

    const value = Math.min(progress, 100);

    updateLoader(tl, true, value, () => {
      updateLoader(rl, false, value, () => {
        updateLoader(bl, true, value, () => {
          updateLoader(ll, false, value, () => {
            setIsComplete(true);
            if (loadingBox.current)
              loadingBox.current.classList.add("finished");
          });
        });
      });
    });
  }, [progress]);

  // propogate
  const propagate = () => {
    if (isComplete) {
      setLoading(false);
      toggleSound();
      if (loadingScreen.current) loadingScreen.current.style.display = "none";
    }
  };

  return (
    <div ref={loadingScreen} className="loading-screen">
      <div ref={loadingBox} onClick={propagate} className="loading-box">
        {isComplete ? (
          <>
            <div
              ref={begin}
              className="title begin"
              style={{ fontWeight: "400" }}
            >
              BEGIN
            </div>
            <div className="subtitle">S O R R O W</div>

            <div ref={tl} className="loader-top" style={{width: "100%"}}></div> {/* WIDTH */}
            <div ref={ll} className="loader-left" style={{height: "100%"}}></div> {/* HEIGHT */}
            <div ref={bl} className="loader-bottom" style={{width: "100%"}}></div> {/* WIDTH */}
            <div ref={rl} className="loader-right" style={{height: "100%"}}></div> {/* HEIGHT */}
          </>
        ) : (
          <>
            <div className="subtitle">PORTFOLIO 2024</div>
            <div className="title">ZELJKO</div>
            <div className="subtitle">SORROW</div>

            <div ref={tl} className="loader-top"></div> {/* WIDTH */}
        <div ref={ll} className="loader-left"></div> {/* HEIGHT */}
        <div ref={bl} className="loader-bottom"></div> {/* WIDTH */}
        <div ref={rl} className="loader-right"></div> {/* HEIGHT */}
          </>
        )}
      </div>
    </div>
  );
}
