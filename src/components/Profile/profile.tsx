import './profile.css';
import React, { useState } from 'react';
import TableInfo from '../TableInfo/tableinfo';
import SideMenu from '../SideMenu/sidemenu';
import AddTermModal from '../Modals/AddTermModal';

const Profile = () => {
    const [showAddTermModal, setShowAddTermModal] = useState(false); 
    
    return (
        <div className="profile-container">
            {showAddTermModal ? <AddTermModal onClose={() => setShowAddTermModal(false)} /> : <TableInfo />}
            <SideMenu openAddTermModal={() => setShowAddTermModal(true)} />
        </div>
    );
};

export default Profile;
