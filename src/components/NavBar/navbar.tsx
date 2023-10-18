import './navbar.css';
import { Link ,NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='navbar_con'>
                <div><img src="/logo/logo_navbar.svg" /></div>
                <div>
                    <ul>
                        <li><Link to="/register" >Зареєструватись</Link></li>
                        <a href="/login"><li>Увійти</li></a>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
