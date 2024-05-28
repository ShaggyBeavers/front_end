import './footer.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Logo from '../Logo/logo';

const Footer = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="footer">
            <div className="footer_con">
                <div className="footer_left">
                    <Link to="/">
                        <h2>Реліквії.3D-музей</h2>
                    </Link>
                    <h6>Тестова версія</h6>
                    <div className="footer_nav">
                        <ul>
                            <li>
                                <HashLink smooth to="/#categories">
                                    Розділи
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="/#week-exhibit">
                                    Експонат тижня
                                </HashLink>
                            </li>
                            <li>
                                <Link
                                    to="/catalogue?page=1"
                                    onClick={handleClick}
                                >
                                    Усі експонати
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">Кабінет</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer_right">
                    <Logo size='220px' color='white'/>
                </div>
            </div>
        </div>
    );
};

export default Footer;
