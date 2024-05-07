import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar/navbar';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { useSearchParams } from 'react-router-dom';

interface ChangePasswordForm {
    password: string;
    confirmPassword: string;
}

const ChangePasswordPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    if (!token) {
        return (
            <div>
                <Helmet>
                    <title>Зміни паролю</title>
                </Helmet>
                <NavBar />
                <div className="flex justify-center items-center h-screen">
                    <h2>
                        Вірний токен не був наданий, спробуйте знову{' '}
                        <a className="recovery-link" href="/recovery">
                            Відновити
                        </a>
                    </h2>
                </div>
            </div>
        );
    }

    console.log(token);
    return (
        <div>
            <Helmet>
                <title>Зміни паролю</title>
            </Helmet>
            <NavBar />
            <ChangePassword token={token} />
        </div>
    );
};

export default ChangePasswordPage;
