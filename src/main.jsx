import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./components/routes.jsx";


const meta = document.createElement('meta');
meta.setAttribute('name','description');
meta.setAttribute('content','manelly67\'s exercise study project:BLOG API within the curriculum The Odin Project');
document.head.appendChild(meta);
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);