import Footer from '../components/Footer/footer';
import Topper from '../components/Topper/topper';
import BannerLanding from '../components/BannerLanding/banner';
import WeeklyExhibit from '../components/WeeklyExhibit/w_exhibit';
import Categories from '../components/Categories/categories';
import NotForSafariUser from '../components/NotForSafariUser/not_for_safari_user';

const HomePage = () => (
    <div>
        <NotForSafariUser />
        <Topper />
        <WeeklyExhibit />
        <BannerLanding />
        <Categories />
        <Footer />
    </div>
);

export default HomePage;
