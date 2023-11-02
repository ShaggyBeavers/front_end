import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

interface NavBarProps {
    firstLI: string;
    firstLink: string;
    secondLI: string;
    secondLink: string;
}

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='navbar_con'>
                <div className='nav_logo'><h2>Divi</h2></div>
                <div className='nav_catalogue'><a href="/catalogue" id='nav_catalogue'>Експонати</a></div>
                <div className='nav_links'>
                    <ul>
                        <li><Link to='/register'>Зареєструватися</Link></li>
                        <a href='/login'><li>Увійти</li></a>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
