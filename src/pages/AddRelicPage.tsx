import { Toaster } from '../components/ui/sonner';
import { EditRelic } from '../components/EditRelic';
import { Helmet } from 'react-helmet';

const AddRelicPage = () => {
    return (
        <>
            <Helmet>
                <title>Нова реліквія</title>
            </Helmet>
            <EditRelic />
            <Toaster richColors />
        </>
    );
};

export default AddRelicPage;
