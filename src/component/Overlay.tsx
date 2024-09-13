import { useLoading } from "../context/LoadingContext";
import { useSound } from "../context/SoundContext";

export function Overlay() {
  const { isSoundOn, toggleSound } = useSound();
  const { isLoading } = useLoading();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="bottom">
          <div onClick={toggleSound} className="sound-container">
            <div className="label">S O U N D</div>
            <img
              src={isSoundOn ? "/image/speaker.png" : "/image/mute.png"}
              alt="sound-speaker"
            />
          </div>
        </div>
      </div>
    </>
  );
}

/*
  return (
    <>
      {/*
      <div className="overlay">
        <div className="top">
          <div className="title">S O R R O W</div>
          <nav>
            <a id="home">HOME</a>
            <a id="about">ABOUT</a>
            <a href="https://github.com/chomnr">GITHUB</a>
            <a href="mailto:me@zeljko.me">CONTACT</a>
          </nav>
        </div>
      </div>
    </>
  );

<div className="overlay">
      <div className="bottom-container">
        <div className="title">S O R R O W</div>
        <nav>
          <a id="home">HOME</a>
          <a id="about">ABOUT</a>
          <a href="https://github.com/chomnr">GITHUB</a>
          <a href="mailto:me@zeljko.me">CONTACT</a>
        </nav>
        <div style={{ textAlign: "center", userSelect: "none" }}></div>
      </div>
      <div onClick={toggleSound} className="toggleable-sound-container">
        <a>S O U N D</a>
        <img
          src={
            isSoundOn
              ? "/image/speaker.png"
              : "/image/mute.png"
          }
          alt="sound-speaker"
        />
      </div>
    </div>
*/
