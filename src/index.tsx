import ReactDOM from "react-dom/client";
import App from "./App";
import { PhaseProvider } from "./context/PhaseContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
