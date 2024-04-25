import NavBar from '../components/NavBar/navbar';
import Login from '../components/Login/login';
import { Helmet } from 'react-helmet';

const LoginPage = () => (
    <div>
        <Helmet>
            <title>Вхід</title>
        </Helmet>
        <NavBar />
        <Login />
    </div>
);

export default LoginPage;
