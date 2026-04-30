import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/structural/App.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
)