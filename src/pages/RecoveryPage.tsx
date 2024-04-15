import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar/navbar";
import RecoveryEmail from "../components/RecoveryEmail/recovery_email";

const RecoveryPage = () => {
    const handleStep1Submit = (data: { email: string }) => {
      // console.log('Step 1 form data:', data);
    };
  
    return (
      <div>
        <Helmet>
            <title>Відновлення паролю</title>
        </Helmet>
        <NavBar />
        <RecoveryEmail/>
      </div>
    );
  };

export default RecoveryPage;
