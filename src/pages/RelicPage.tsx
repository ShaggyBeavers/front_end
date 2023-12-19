import NavBar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import Relic from "../components/Relic/Relic";
import { useParams } from "react-router-dom";


const RelicPage = () => {
  const { relicId} = useParams();

  const relicIdParam = relicId ? parseInt(relicId, 10) : 0; 

  return (
    <div>
      <NavBar />
      <Relic relicId={relicIdParam} />
      <Footer />
    </div>
  );
};
export default RelicPage;
