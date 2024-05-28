import { useState } from 'react';
import { Filters } from '../Catalogue/catalogue';
import NavBar from '../NavBar/navbar';
import Search from '../Search/search';
import './topper.css';

const Topper = () => {
    return (
        <div>
            <NavBar />
            <div className="topper">
                <div className="topper_con">
                    <h1>Реліквії.3D-музей</h1>
                    <h6>Тестова версія, представлена для ознайомлення</h6>
                    <Search/>
                </div>
            </div>
        </div>
    );
};

export default Topper;
