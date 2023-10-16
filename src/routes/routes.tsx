import App from "../app/app";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/Register";
import Catalogue from "../pages/CataloguePage";
import { createBrowserRouter } from "react-router-dom";
import React from "react";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'catalogue', element: <Catalogue /> }
        ]
    }
]);
