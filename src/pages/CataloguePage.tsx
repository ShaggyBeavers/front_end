import NavBar from '../components/NavBar/navbar';
import Footer from '../components/Footer/footer';
import Catalogue from '../components/Catalogue/catalogue';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet';
const CataloguePage = () => (
    <div>
        <Helmet>
            <title>Експонати</title>
        </Helmet>
        <NavBar />
        <Catalogue />
        <Footer />
        <Toaster richColors />
    </div>
);

export default CataloguePage;
