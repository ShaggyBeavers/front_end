import Report from '../components/Report/report';
import Footer from '../components/Footer/footer';
import NavBar from '../components/NavBar/navbar';
import { Toaster } from 'sonner';
// import { Toaster } from '../components/ui/sonner';
const ReportPage = () => (
    <div>
        <NavBar />
        <Report />
        <Footer />
        <Toaster richColors />
    </div>
);

export default ReportPage;
