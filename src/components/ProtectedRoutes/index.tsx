import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/AuthStore';
import { AuthStore } from '../../stores/AuthStore';
import { RoleEnum } from '../../enums/roles';

type userType = { user: { loggedIn: boolean } };

const ProtectedRoutes = ({
    role,
    redirectPath = '/login',
    children,
}: {
    role: RoleEnum[];
    redirectPath?: string;
    children: any;
}) => {
    const { isLoggedIn, role: userRole } = useAuthStore((state: AuthStore) => ({
        isLoggedIn: state.user?.isLoggedIn ?? false,
        role: state.user?.role,
    }));

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    const isRoleMatch = role.some((r) => r === userRole);

    if (role && !isRoleMatch) {
        return <Navigate to="/unauthorized" replace />;
    }

    // return <Navigate to="/profile" />;
    return children;
};

export default ProtectedRoutes;
