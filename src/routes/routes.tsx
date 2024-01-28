import App from '../app/app';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CataloguePage from '../pages/CataloguePage';
import ReportPage from '../pages/ReportPage';
import RecoveryPage from '../pages/RecoveryPage';
import NotFoundPage from '../pages/NotFoundPage';
import RelicPage from '../pages/RelicPage';

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
            { path: 'report', element: <ReportPage /> },
            { path: 'recovery', element: <RecoveryPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'profile', element: <ProfilePage /> },
        ],
    },
]);
