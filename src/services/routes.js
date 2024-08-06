import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/Login";

const Router = createBrowserRouter([
  {
    path: "Login",
    element: <LoginPage />,
  },

  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);

export default Router;
