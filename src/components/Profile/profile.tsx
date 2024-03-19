import './profile.css';
import React, { useState } from 'react';
import RelicTableInfo from '../TableInfo/tableinfo';
import TableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AddTermModal from '../Modals/AddTermModal';
import ModeratorList from '../ModeratorList';

//    const [showAddTermModal, setShowAddTermModal] = useState(false);  
//    return (
//        <div className="profile-container">
//            {showAddTermModal ? <AddTermModal onClose={() => setShowAddTermModal(false)} /> : <TableInfo />}
//            <SideMenu openAddTermModal={() => setShowAddTermModal(true)} />

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
