import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SubscripcionDatos } from "./Subscripcion/pages/SubscripcionDatos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SubscripcionDatos />
  </React.StrictMode>
);
