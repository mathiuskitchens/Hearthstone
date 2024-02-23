import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./routes/Login.jsx";
import Browse from "./routes/Browse.jsx";
import BrowseSkeleton from "./components/BrowseSkeleton.jsx";
import Profile from "./routes/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/browse",
    element: <Browse />,
    errorElement: <ErrorPage />,
    fallback: <BrowseSkeleton />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
