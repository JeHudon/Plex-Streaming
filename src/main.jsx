import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Pages/App.jsx";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routeur } from "./Routeur.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routeur />
  </StrictMode>,
);
