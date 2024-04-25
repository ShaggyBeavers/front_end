import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar/navbar';
import SuccessRec from '../components/SuccessRec/success_rec';

const SuccessRecovery = () => (
    <div>
        <Helmet>
            <title>Успішне відновлення паролю</title>
        </Helmet>
        <NavBar />
        <SuccessRec />
    </div>
);

export default SuccessRecovery;
