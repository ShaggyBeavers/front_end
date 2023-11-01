import NavBar from '../NavBar/navbar';
import Search from '../Search/search';
import './topper.css';

const Topper = () => {
    return (
        <div>
            <NavBar />
            <div className="topper">
                <div className='topper_con'>
                    <h1>Divi</h1>
                    <Search/>
                </div>
            </div>
        </div>
    );
};

export default Topper;
