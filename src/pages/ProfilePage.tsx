import { Toaster } from 'sonner';
import NavBar from '../components/NavBar/navbar';
import Profile from '../components/Profile/profile';

const ProfilePage = () => (
    <>
        <NavBar />
        <Profile />
        <Toaster richColors />
    </>
);

export default ProfilePage;
