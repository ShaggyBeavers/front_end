import Report from '../components/Report/report';
import Footer from '../components/Footer/footer';
import NavBar from '../components/NavBar/navbar';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet';
// import { Toaster } from '../components/ui/sonner';
const ReportPage = () => (
    <div>
        <Helmet>
            <title>Повідомити</title>
        </Helmet>
        <NavBar />
        <Report />
        <Footer />
        <Toaster richColors />
    </div>
);

export default ReportPage;
