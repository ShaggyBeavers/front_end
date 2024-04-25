import { Toaster } from 'sonner';
import NavBar from '../components/NavBar/navbar';
import Profile from '../components/Profile/profile';
import { Helmet } from 'react-helmet';

const ProfilePage = () => (
    <>
        <Helmet>
            <title>Кабінет</title>
        </Helmet>
        <NavBar />
        <Profile />
        <Toaster richColors />
    </>
);

export default ProfilePage;
