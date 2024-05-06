import App from '../app/app';
import { Outlet, createBrowserRouter } from 'react-router-dom';
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
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import queryString from 'query-string';
import ChangePassword from '../pages/ChangePassword';
const { parse, stringify } = queryString;

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <QueryParamProvider
                adapter={ReactRouter6Adapter}
                options={{
                    searchStringToObject: parse,
                    objectToSearchString: stringify,
                }}
            >
                <App />
            </QueryParamProvider>
        ),
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'catalogue', element: <CataloguePage /> },
            { path: 'catalogue/:relicsid', element: <RelicPage /> },
            {
                path: 'report',
                element: (
                    <ProtectedRoutes
                        role={[
                            RoleEnum.MODERATOR,
                            RoleEnum.REGIONAL_MODERATOR,
                            RoleEnum.ADMIN,
                            RoleEnum.USER,
                        ]}
                    >
                        <ReportPage />
                    </ProtectedRoutes>
                ),
            },
            { path: 'recovery', element: <RecoveryPage /> },
            { path: 'success_recovery', element: <SuccessRecovery /> },
            { path: 'change_password', element: <ChangePassword /> },
            { path: '*', element: <NotFoundPage /> },
            {
                path: 'profile',
                element: <Outlet />,
                children: [
                    {
                        index: true,
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
                    },
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
                    {
                        path: 'moderator-list/:regMod?',
                        element: (
                            <ProtectedRoutes
                                role={[
                                    RoleEnum.ADMIN,
                                    RoleEnum.REGIONAL_MODERATOR,
                                ]}
                            >
                                <ProfilePage />
                            </ProtectedRoutes>
                        ),
                    },
                    {
                        path: 'add-term',
                        element: (
                            <ProtectedRoutes
                                role={[
                                    RoleEnum.MODERATOR,
                                    RoleEnum.REGIONAL_MODERATOR,
                                    RoleEnum.ADMIN,
                                ]}
                            >
                                <ProfilePage />
                            </ProtectedRoutes>
                        ),
                    },
                ],
            },
        ],
    },
]);
