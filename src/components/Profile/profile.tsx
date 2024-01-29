import './profile.css';
import React from 'react';
import TableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';

const Profile = () => {
    return (
        <div className="profile-container">
            <TableInfo />
            <SideMenu />
        </div>
    );
};

export default Profile;
