import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./pages/create-trip";

const router = createBrowserRouter([
   {
      path: "/",
      element: <CreateTrip />,
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
