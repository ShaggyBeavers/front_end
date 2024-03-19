import './profile.css';
import React from 'react';
import RelicTableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import ModeratorList from '../ModeratorList';

const Profile = () => {
    const location = useLocation();
    const path = location.pathname;
    const isModeratorList = path.endsWith('moderator-list');
    const isProfile = path.endsWith('profile');

    return (
        <div className="profile-container">
            {isModeratorList && <ModeratorList />}
            {isProfile && <RelicTableInfo />}
            <SideMenu />
        </div>
    );
};

export default Profile;
