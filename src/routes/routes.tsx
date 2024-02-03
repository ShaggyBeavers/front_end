import App from "../app/app";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CataloguePage from "../pages/CataloguePage";
import ReportPage from "../pages/ReportPage";
import RecoveryPage from "../pages/RecoveryPage";
import NotFoundPage from "../pages/NotFoundPage";
import RelicPage from "../pages/RelicPage";
import SuccessRecovery from "../pages/SuccessRecovery";
import AddRelicPage from "../pages/AddRelicPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'catalogue', element: <CataloguePage /> },
            { path: 'catalogue/:relicsid', element: <RelicPage /> },
            { path: 'profile', element: <ProfilePage/> },
            { path: 'report', element: <ReportPage/> },
            { path: 'recovery', element: <RecoveryPage/> },
            { path: 'success_recovery' ,element: <SuccessRecovery/>},
            { path: '*', element: <NotFoundPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'add-relic', element: <AddRelicPage/>},
        ],
    },
]);
