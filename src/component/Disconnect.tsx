import { Phase, usePhase } from "../context/PhaseContext";

export function DisconnectRobotUi() {
  const { phase } = usePhase();

  if (phase !== Phase.RobotForcefulDisconnect) {
    return null;
  }
  return (
    <div className="disconnect-container">
      <div className="disconnect">DISCONNECTED</div>
    </div>
  );
}
