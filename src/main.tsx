import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToastProvider from "./components/toast";
import { App } from "./app.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ToastProvider>
         <App />
      </ToastProvider>
   </React.StrictMode>
);
