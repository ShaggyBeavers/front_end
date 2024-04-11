import NavBar from '../components/NavBar/navbar';
import Footer from '../components/Footer/footer';
import Catalogue from '../components/Catalogue/catalogue';
import { Toaster } from 'sonner';
const CataloguePage = () => (
    <div>
        <NavBar />
        <Catalogue />
        <Footer />
        <Toaster richColors />
    </div>
);

export default CataloguePage;
