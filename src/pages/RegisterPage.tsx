import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar/navbar';
import Register from '../components/Register/register';

const RegisterPage = () => (
    <div>
        <Helmet>
            <title>Реєстрація</title>
        </Helmet>
        <NavBar />
        <Register />
    </div>
);

export default RegisterPage;
