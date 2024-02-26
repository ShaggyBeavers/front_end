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
import SuccessRecovery from '../pages/SuccessRecovery';
import AddRelicPage from '../pages/AddRelicPage';
import ProtectedRoutes from '../components/ProtectedRoutes';
import { RoleEnum } from 'src/enums/roles';

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
            { path: 'success_recovery', element: <SuccessRecovery /> },
            { path: '*', element: <NotFoundPage /> },
            {
                path: 'profile',
                element: (
                    <ProtectedRoutes
                        role={[
                            RoleEnum.MODERATOR,
                            RoleEnum.REGIONAL_MODERATOR,
                            RoleEnum.ADMIN,
                            RoleEnum.USER,
                        ]}
                    >
                        <ProfilePage />
                    </ProtectedRoutes>
                ),
                children: [
                    {
                        path: 'add-relic',
                        element: (
                            <ProtectedRoutes
                                role={[
                                    RoleEnum.MODERATOR,
                                    RoleEnum.REGIONAL_MODERATOR,
                                    RoleEnum.ADMIN,
                                ]}
                            >
                                <AddRelicPage />
                            </ProtectedRoutes>
                        ),
                    },
                ],
            },
        ],
    },
]);
