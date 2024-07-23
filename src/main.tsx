import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToastProvider from "./components/toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./pages/create-trip";
import TripDetailsPage from "./pages/trip-details/[id]";

const router = createBrowserRouter([
   {
      path: "/",
      element: <CreateTrip />,
   },

   {
      path: "/trip-details/:tripId",
      element: <TripDetailsPage />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ToastProvider>
         <RouterProvider router={router} />
      </ToastProvider>
   </React.StrictMode>
);
