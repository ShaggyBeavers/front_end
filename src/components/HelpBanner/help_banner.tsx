import { Link } from 'react-router-dom';
import './help_banner.css';

const HelpBanner = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div>
            <div className="Hbanner_landing">
                <div className="Hban_lan_con ">
                    <div className="Hban_lan_con_left">
                        <h1>Привіт!</h1>
                        <h2>Ти чув, бачив чи знаєш про втрачену реліквію?</h2>
                    </div>
                    <div className="Hban_lan_con_right">
                        <h2>Поможи - заповни форму</h2>
                        <Link to={'/report'} onClick={handleClick}><h2 className='help_link'>"Повідомити"</h2></Link>
                    </div>
                    <div className="Hban_lan_con_left">
                        <h5>* Для заповнення форми необхідно пройти <Link to={'/register'} className='help_reg_link' onClick={handleClick}>реєстрацію</Link></h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpBanner;
