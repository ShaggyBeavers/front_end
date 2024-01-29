import { useLocation } from "react-router-dom";
import AddMainRelic from "../components/AddMainRelic";
import AddLostRelic from "../components/AddLostRelic";
import AddReturnedRelic from "../components/AddReturnedRelic";

const AddRelicPage = () => {
    const location = useLocation();
    const {isReturned, isLost, isMain} = location.state;
    console.log(location.state);

    return (
        <>
            {isReturned && <AddReturnedRelic />}            
            {isLost && <AddLostRelic />}
            {isMain && <AddMainRelic />}
        </>
    );
}

export default AddRelicPage;