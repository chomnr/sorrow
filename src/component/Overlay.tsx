import { useState } from "react";
import { Phase, usePhase } from "../context/PhaseContext";
import { useSound } from "../context/SoundContext";

export function Overlay() {
  const { phase } = usePhase();
  const { isSoundOn, toggleSound } = useSound();
  const [showInfo, setShowInfo] = useState(false);

  if (
    phase === Phase.Loading ||
    phase === Phase.Loaded ||
    phase === Phase.RobotForcefulDisconnect
  ) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="top">
          <div className="text">Z E L J K O &nbsp;&nbsp;V R A N J E S</div>
          <div className="text smaller">
            S O F T W A R E &nbsp;&nbsp;E N G I N E E R
          </div>
          <div className="icons">
            <a href="https://github.com/chomnr">
              <img alt="github" src="/image/github.png"></img>
            </a>
            <a href="https://github.com/chomnr/sorrow/">
              <img alt="blog" src="/image/code.png"></img>
            </a>
            <a href="https://blog.zeljkovranjes.com/">
              <img alt="blog" src="/image/write.png"></img>
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="sound-container">
            <div className="label">S O U N D</div>
            <img
              onClick={toggleSound}
              src={isSoundOn ? "/image/speaker.png" : "/image/mute.png"}
              alt="sound-speaker"
            />
          </div>
          <div className="question-container">
            <img
              onClick={() => setShowInfo(!showInfo)}
              src="/image/question.png"
              alt="question-mark"
            />
          </div>
        </div>

        <div
          className="info-container"
          style={{ display: showInfo ? "flex" : "none" }}
        >
          <div className="date">September 19th, 2024</div>
          <div className="title">ABOUT</div>
          <div className="body">
            Sadness, disappointment, and misfortune. These past few years have
            been tough for many of us, including me. These statement(s) were a
            source of inspiration for my portfolio site. I tried to imbue how I
            felt onto this website, hence the dark atmosphere. While it is a
            portfolio, I tried showcasing my capabilities. I really hope you
            enjoy it.
            <div
              className="close"
              style={{ display: "flex", alignItems: "center", gap: "17px" }}
            >
              You can close this by clicking{" "}
              <img
                onClick={() => {}}
                src="/image/question.png"
                alt="question-mark"
              />
            </div>
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
