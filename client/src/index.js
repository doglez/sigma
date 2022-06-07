import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
