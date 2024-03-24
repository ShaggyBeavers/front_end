import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/AuthStore';
import { AuthStore } from '../../stores/AuthStore';
import { RoleEnum } from '../../enums/roles';

type userType = { user: { loggedIn: boolean } };

const ProtectedItems = ({
    role,
    children,
}: {
    role: RoleEnum[];
    children: any;
}) => {
    const { isLoggedIn, role: userRole } = useAuthStore((state: AuthStore) => ({
        isLoggedIn: state.user?.isLoggedIn ?? false,
        role: state.user?.role,
    }));

    // console.log('ProtectedItem', isLoggedIn, userRole, children.props.text);

    const isRoleMatch = role.some((r) => r === userRole);

    if (!isLoggedIn || (role && !isRoleMatch)) {
        return <></>;
    }

    return children;
};

export default ProtectedItems;
