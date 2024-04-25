import NavBar from '../components/NavBar/navbar';
import Footer from '../components/Footer/footer';
import NotFound from '../components/NotFound/not_found';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => (
    <div>
        <Helmet>
            <title>Не знайдено</title>
        </Helmet>
        <NavBar />
        <NotFound />
        <Footer />
    </div>
);

export default NotFoundPage;
