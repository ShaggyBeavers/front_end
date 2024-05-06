import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar/navbar';
import RecoveryEmail from '../components/RecoveryEmail/recovery_email';

const ChangePassword = () => {
    const handleStep1Submit = (data: { email: string }) => {
        // console.log('Step 1 form data:', data);
    };

    return (
        <div>
            <Helmet>
                <title>Зміни паролю</title>
            </Helmet>
            <NavBar />
            <RecoveryEmail />
        </div>
    );
};

export default ChangePassword;
