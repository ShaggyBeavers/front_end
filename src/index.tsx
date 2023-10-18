import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {router} from "./routes/routes";
import './index.css';
import './fonts/fonts.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <React.StrictMode>
        <RouterProvider router={router}/>      
    </React.StrictMode>
  </div>
);

