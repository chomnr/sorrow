/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */

import { CameraLocation } from "./App";
import { VirtualMoveCamera } from "./Helper";

export function Overlay() {
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
      </div>
    </div>
  );
}
