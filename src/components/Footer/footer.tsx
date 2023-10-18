import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className='footer_con'>
                <div className="footer_left">
                    <Link to="/"><h2>Назва проєкту</h2></Link>
                    <div className="footer_nav">
                        <ul>
                            <li><Link to="/" >Останні події</Link></li>
                            <li><Link to="/" >Експонат тижня</Link></li>
                            <li><Link to="/" >Усі експонати</Link></li>
                            <li><Link to="/profile">Кабінет</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer_right">
                    <img src="/logo/logo_footer.png" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
