import App from "../app/app";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Register";
import CataloguePage from "../pages/CataloguePage";
import ReportPage from "../pages/ReportPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'catalogue', element: <CataloguePage /> },
            { path: 'profile', element: <ProfilePage/> },
            { path: 'report', element: <ReportPage/> }
        ]
    }
]);
