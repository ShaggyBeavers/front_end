import './profile.css';
import React, { useState } from 'react';
import RelicTableInfo from '../TableInfo/tableinfo';
import TableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AddTerm from '../AddTerm';
import ModeratorList from '../ModeratorList';
import ProtectedItems from '../ProtectedItems';
import { RoleEnum } from '../../../src/enums/roles';

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

const Profile = () => {
    const location = useLocation();
    const path = location.pathname;
    const isModeratorList = path.endsWith('moderator-list');
    const isProfile = path.endsWith('profile');
    const isAddTerm = path.endsWith('add-term');

    const lastPath = path.split('/').pop();
    const header = headers.find((h) => h.path === lastPath);
    const displayName = header ? header.name : '';

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-header">
                    <h2>{displayName}</h2>
                    <ProtectedItems
                        role={[
                            RoleEnum.ADMIN,
                            RoleEnum.REGIONAL_MODERATOR,
                            RoleEnum.MODERATOR,
                        ]}
                    >
                        {header && header.path === 'profile' ? (
                            <p>
                                Тут ви можете переглянути репорти про релівії{' '}
                            </p>
                        ) : (
                            <p>
                                Тут ви можете переглянути модераторів сайту,
                                {/* <Link> Повідомивши</Link> */}
                            </p>
                        )}
                    </ProtectedItems>
                </div>
                {isModeratorList && <ModeratorList />}
                {isProfile && <RelicTableInfo />}
                {isAddTerm && <AddTerm />}
            </div>
            <SideMenu currentPage={path} />
        </div>
    );
};

export default Profile;
