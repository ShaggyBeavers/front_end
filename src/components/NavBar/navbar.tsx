import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    const location = useLocation();
    return (
        <div className='navbar'>
            <div className='navbar_con'>
                <div className='nav_logo'><Link to='/'><h2>Divi</h2></Link></div>
                {location.pathname !== '/catalogue' &&location.pathname !== '/catalogue/' && <div className={`nav_catalogue ${location.pathname === '/' ? 'main' : ''}`}><Link to="/catalogue?page=1" >Експонати</Link></div>}
                <div className='nav_links'>
                    <ul>
                        {!(location.pathname === '/register' || location.pathname === '/login') && (
                            <li className={`${location.pathname === '/' ? 'main' : ''}`}><Link to='/register'>Зареєструватися</Link></li>
                        )}
                        {!(location.pathname === '/register' || location.pathname === '/login') && (
                            <Link to='/login' id='nav_log_btn'><li>Увійти</li></Link>
                        )}
                        {location.pathname === '/register' && (
                            <div className='reg_links'>
                                <p>Уже маєте акаунт?</p>
                                <Link to='/login'>Увійти</Link>
                            </div>
                        )}
                        {location.pathname === '/login' && (
                            <div className='log_links'>
                                <p>Ще не маєте акаунта?</p>
                                <Link to='/register'>Зареєструватися</Link>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
