import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { setLoading } = useLoading()

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
          requestAnimationFrame(() =>
            updateLoader(loaderRef, isWidth, value, nextLoaderFn)
          );
        } else if (nextLoaderFn) {
          nextLoaderFn();
        }
      }
    };

    const value = Math.min(progress, 100);

    updateLoader(tl, true, value, () => {
      updateLoader(rl, false, value, () => {
        updateLoader(bl, true, value, () => {
          updateLoader(ll, false, value, () => {
            setTimeout(() => {
              setIsComplete(true)
              if (loadingBox.current)
                loadingBox.current.classList.add("finished")
            }, 1400);
          });
        });
      });
    });
  }, [progress]);

  // propogate
  const propagate = () => {
    if (isComplete) {
      setLoading(true);
      if (loadingScreen.current)
        loadingScreen.current.style.display = "none";
    }
  };

  return (
    <div ref={loadingScreen} className="loading-screen">
      <div ref={loadingBox} onClick={propagate} className="loading-box">
        {isComplete ? (
          <>
            <div ref={begin} className="title begin" style={{fontWeight: "400"}}>BEGIN</div>
            <div className="subtitle">I M M E R S I O N</div>
          </>
        ) : (
          <>
            <div className="subtitle">PORTFOLIO 2024</div>
            <div className="title">ZELJKO</div>
            <div className="subtitle">01010011</div>
          </>
        )}
        <div ref={tl} className="loader-top"></div> {/* WIDTH */}
        <div ref={ll} className="loader-left"></div> {/* HEIGHT */}
        <div ref={bl} className="loader-bottom"></div> {/* WIDTH */}
        <div ref={rl} className="loader-right"></div> {/* HEIGHT */}
      </div>
    </div>
  );
}

/*
 <div className="loading-screen">
      {isComplete ? (
        <div className="loading-box">
          <div className="loading-box">
            <div className="title">START</div>
          </div>
          </div>
        ) : (
          <div className="loading-box">
            <div className="subtitle">PORTFOLIO 2024</div>
            <div className="title">ZELJKO</div>
            <div className="subtitle">01010011</div>
            <div ref={tl} className="loader-top"></div>
            <div ref={ll} className="loader-left"></div>
            <div ref={bl} className="loader-bottom"></div>
            <div ref={rl} className="loader-right"></div> 
          </div>
        )}
  
        <div className="loading-box">
          <div className="subtitle">PORTFOLIO 2024</div>
          <div className="title">ZELJKO</div>
          <div className="subtitle">01010011</div>
          <div ref={tl} className="loader-top"></div>
          <div ref={ll} className="loader-left"></div>
          <div ref={bl} className="loader-bottom"></div>
          <div ref={rl} className="loader-right"></div>
        </div>
      </div>
*/
