import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import ToastProvider from "./components/toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ToastProvider>
         <App />
      </ToastProvider>
   </React.StrictMode>
);
