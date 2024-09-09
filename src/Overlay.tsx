/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */

import { CameraLocation } from "./App";
import { useSound } from "./Context";
import { VirtualMoveCamera } from "./Helper";

export function Overlay() {
  const {isSoundOn, toggleSound} = useSound();

  return (
    <div className="overlay">
      <div className="bottom-container">
        <div className="title">S O R R O W</div>
        <nav>
          <a
            id="home"
            onClick={() => VirtualMoveCamera(CameraLocation.INITIAL)}
          >
            HOME
          </a>
          <a
            id="about"
            onClick={() => VirtualMoveCamera(CameraLocation.MONITOR)}
          >
            ABOUT
          </a>
          <a href="https://github.com/chomnr">GITHUB</a>
          <a href="mailto:me@zeljko.me">CONTACT</a>
        </nav>
        {/*
        <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <img
            width="20"
            height="20"
            src={isSoundOn
              ? "https://img.icons8.com/material-rounded/20/FFFFFF/speaker.png"
              : "https://img.icons8.com/material-rounded/20/FFFFFF/mute.png"}
            alt={isSoundOn ? "speaker" : "mute"}
            onClick={toggleSound}
            style={{ cursor: 'pointer' }}
          />
        </div>
        */}
      </div>
    </div>
  );
}