import NavBar from '../components/NavBar/navbar';
import Footer from '../components/Footer/footer';
import Relic from '../components/Relic/Relic';
import { Helmet } from 'react-helmet';

const RelicPage = () => {
    return (
        <div>
            <Helmet>
                <title>Реліквія</title>
            </Helmet>
            <NavBar />
            <Relic />
            <Footer />
        </div>
    );
};
export default RelicPage;
