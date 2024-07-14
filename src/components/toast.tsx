import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
   children: ReactNode;
}

const ToastProvider = ({ children }: ToastProps) => {
   return (
      <>
         {children}

         <ToastContainer />
      </>
   );
};

export default ToastProvider;
