import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='navbar_con'>
                <div className='nav_logo'><Link to='/'><h2>Divi</h2></Link></div>
                <div className='nav_catalogue'><Link to="/catalogue?page=1" id='nav_catalogue'>Експонати</Link></div>
                <div className='nav_links'>
                    <ul>
                        <li><Link to='/register'>Зареєструватися</Link></li>
                        <Link to='/login' id='nav_log_btn'><li>Увійти</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
