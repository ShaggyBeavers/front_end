import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/AuthStore';
import './navbar.css';
import { Button } from '../ui/button';
import DefaultButton from '../DefaultButton/defaultbutton';
import { ConfirmButton } from '../ConfirmButton';

interface NavBarProps {
    styles?: string;
}

const isLogged = (user: any) => {
    return user !== null && user.isLoggedIn;
};

const NavBar: React.FC<NavBarProps> = ({ styles }) => {
    const location = useLocation();
    const { user } = useAuthStore();
    return (
        <div className="navbar">
            <div className={`navbar_con ${styles}`}>
                <div className="nav_logo">
                    <Link to="/">
                        <h2>Divi</h2>
                    </Link>
                </div>
                {location.pathname !== '/catalogue' &&
                    location.pathname !== '/catalogue/' && (
                        <div
                            className={`nav_catalogue ${location.pathname === '/' ? 'main' : ''}`}
                        >
                            <Link to="/catalogue?page=1">Експонати</Link>
                        </div>
                    )}
                <div className="nav_links">
                    <ul>
                        {!isLogged(user) ? (
                            <>
                                {!(
                                    location.pathname === '/register' ||
                                    location.pathname === '/login'
                                ) && (
                                    <li
                                        className={`${location.pathname === '/' ? 'main' : ''}`}
                                    >
                                        <Link to="/register">
                                            Зареєструватися
                                        </Link>
                                    </li>
                                )}
                                {!(
                                    location.pathname === '/register' ||
                                    location.pathname === '/login'
                                ) && (
                                    <li>
                                        <Link
                                            to="/login"
                                            className="nav_log_btn"
                                        >
                                            Увійти
                                        </Link>
                                    </li>
                                )}
                                {location.pathname === '/register' && (
                                    <div className="reg_links">
                                        <p>Уже маєте акаунт?</p>
                                        <Link
                                            to="/login"
                                            style={{
                                                fontFamily: 'eUkraine-Bold',
                                            }}
                                        >
                                            Увійти
                                        </Link>
                                    </div>
                                )}
                                {location.pathname === '/login' && (
                                    <div className="log_links">
                                        <p>Ще не маєте акаунта?</p>
                                        <Link
                                            to="/register"
                                            style={{
                                                fontFamily: 'eUkraine-Bold',
                                            }}
                                        >
                                            Зареєструватися
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <li
                                    className={`${location.pathname === '/' ? 'main' : ''}`}
                                >
                                    <Link to="/report">Повідомити</Link>
                                </li>
                                <li className="nav_log_btn">
                                    <Link to="/profile">Кабінет</Link>
                                    <ConfirmButton
                                        // className="logout_btn"
                                        buttonMessage="Вийти"
                                        buttonVariant="link"
                                        dialogTitle="Вийти"
                                        dialogDescription="Ви впевнені, що хочете вийти?"
                                        dialogAction={() => {
                                            localStorage.removeItem(
                                                'auth-store'
                                            );
                                            window.location.reload();
                                        }}
                                    />
                                    {/* <Button>
                                        <Link to="/profile">Кабінет</Link>
                                    </Button> */}
                                    {/* <button className="logout_btn">
                                        Вийти
                                    </button> */}
                                </li>
                                {/* <li>
                                    <ConfirmButton
                                        buttonMessage="Вийти"
                                        // buttonVariant="ghost"
                                        dialogTitle="Вийти"
                                        dialogDescription="Ви впевнені, що хочете вийти?"
                                        dialogAction={() => {
                                            localStorage.removeItem(
                                                'auth-store'
                                            );
                                            window.location.reload();
                                        }}
                                    />
                                </li> */}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
