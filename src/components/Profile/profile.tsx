import './profile.css';
import React, { useState } from 'react';
import RelicTableInfo from '../TableInfo/tableinfo';
import TableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AddTermModal from '../Modals/AddTermModal';
import ModeratorList from '../ModeratorList';

const headers = [
    {
        name: 'Список репортів',
        path: 'profile',
    },
    {
        name: 'Список модераторів',
        path: 'moderator-list',
    },
    {
        name: 'Список регіональних модераторів',
        path: 'moderator-list?regMod=true',
    },
];
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

    const lastPath = path.split('/').pop();
    const header = headers.find((h) => h.path === lastPath);
    const displayName = header ? header.name : '';

    return (
        <div className="profile-container">
            <div className="content-container w-full">
                {/* <h2>{displayName}</h2> */}
                {isModeratorList && <ModeratorList />}
                {isProfile && <RelicTableInfo />}
            </div>
            <SideMenu />
        </div>
    );
};

export default Profile;
