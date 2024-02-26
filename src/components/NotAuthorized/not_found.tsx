import './not_found.css';
import Logo404 from '../icons/logo404';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="not_found_con">
        <div className="not_found">
            {/* <Logo404 /> */}
            <h1>Помилка 401</h1>
            <h3>У вас недостатньо прав</h3>
            <Link to={'/'}>
                <button>Вернутись на Головну сторінку</button>
            </Link>
        </div>
    </div>
);

export default NotFound;
