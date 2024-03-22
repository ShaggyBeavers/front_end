import React, { useState } from 'react';
import Modal from 'react-modal';
import './sidemenu.css';
import DefaultButton from '../DefaultButton/defaultbutton';
import ReactDOM from 'react-dom';
import AddRelicModal from '../Modals/AddRelicModal';
import AddModeratorModal from '../Modals/AddModeratorModal';
import ModeratorsListModal from '../Modals/ModeratorsListModal';
import AddTermModal from '../Modals/AddTermModal';
import Settings from '../Modals/Settings';
import { useQuery } from '@tanstack/react-query';
import UserAPI from '../../app/api/Account/User/user';
import { useAuthStore, decodeAccessToken } from '../../stores/AuthStore';
import ProtectedItems from '../../components/ProtectedItems';
import { set } from 'react-hook-form';
import { RoleEnum } from '../../enums/roles';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');

interface IModal {
    [key: string]: {
        isOpen: boolean;
        content: React.ReactNode;
        styles: string;
    };
}

interface SideMenuProps {
    openAddTermModal: () => void;
}

//const SideMenu : React.FC<SideMenuProps> = ({ openAddTermModal }) => {
const SideMenu = () => {
    const navigate = useNavigate();

    const [modals, setModals] = useState<IModal>({
        settings: {
            isOpen: false,
            content: <Settings />,
            styles: 'settings-window',
        },
        addRelic: {
            isOpen: false,
            content: <AddRelicModal />,
            styles: 'add-relic-window',
        },
        addModerator: {
            isOpen: false,
            content: <AddModeratorModal />,
            styles: 'add-moderator-window',
        },
        moderatorsList: {
            isOpen: false,
            content: <ModeratorsListModal />,
            styles: 'moderators-list-window',
        },
    });
    //@ts-ignore
    const email = useAuthStore((state) => state.user.email);
    const accessToken = useAuthStore((state) => state.accessToken);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['currentUser', accessToken],
        queryFn: () => UserAPI.getUserProfile(accessToken),
    });

    console.log(data);

    const handleModeratorList = () => {
        const currentPath = window.location.pathname;
        if (currentPath.endsWith('moderator-list')) {
            window.location.reload();
        } else {
            console.log(currentPath);
            navigate('./moderator-list');
        }
    };

    const handleModal = (modalName: string, isOpen: boolean) => {
        setModals((prevModals) => ({
            ...prevModals,
            [modalName]: {
                isOpen: isOpen,
                content: prevModals[modalName].content,
                styles: prevModals[modalName].styles,
            },
        }));
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.3)',
        },
        // content: {
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     top: "50%",
        //     left: "50%",
        //     right: "auto",
        //     bottom: "auto",
        //     marginRight: "-50%",
        //     transform: "translate(-50%, -50%)",
        //     width: "700px",
        //     height: "500px",
        //     borderRadius: "20px",
        // },
    };

    return (
        <>
            {Object.keys(modals).map((modalName) => (
                <Modal
                    key={modalName}
                    isOpen={modals[modalName].isOpen}
                    onRequestClose={() => handleModal(modalName, false)}
                    preventScroll={true}
                    style={customStyles}
                    className={modals[modalName].styles}
                >
                    {modals[modalName].content}
                </Modal>
            ))}
            <div className="flex-box">
                <div className="name-banner">
                    <div className="row1">
                        <h4 className="name">
                            {data?.data?.firstName} {data?.data?.lastName}
                        </h4>
                        <DefaultButton
                            height={28}
                            width={180}
                            font={'12px'}
                            text={'Налаштування'}
                            action={() => handleModal('settings', true)}
                        />
                    </div>
                    <div className="row2">
                        <p className="contact">Контакт:</p>
                        <p className="email">{email}</p>
                    </div>
                </div>
                <ProtectedItems
                    role={[
                        RoleEnum.ADMIN,
                        RoleEnum.MODERATOR,
                        RoleEnum.REGIONAL_MODERATOR,
                    ]}
                >
                    <DefaultButton
                        height={38}
                        width={300}
                        text="Додати Реліквію"
                        action={() => handleModal('addRelic', true)}
                    />
                </ProtectedItems>
                <ProtectedItems role={[RoleEnum.ADMIN]}>
                    <DefaultButton
                        height={38}
                        width={300}
                        text="Додати модератора"
                        action={() => handleModal('addModerator', true)}
                    />
                </ProtectedItems>
                <ProtectedItems
                    role={[RoleEnum.ADMIN, RoleEnum.REGIONAL_MODERATOR]}
                >
                    <DefaultButton
                        height={38}
                        width={300}
                        text="Список модераторів"
                        action={() => handleModeratorList()}
                    />
                </ProtectedItems>
                <ProtectedItems
                    role={[
                        RoleEnum.ADMIN,
                        RoleEnum.REGIONAL_MODERATOR,
                        RoleEnum.MODERATOR,
                    ]}
                >
                    <DefaultButton
                        height={38}
                        width={300}
                        text="Додати термін"
                        action={() => handleModal('addTerm', true)}
                    />
                </ProtectedItems>
            </div>
        </>
    );
};

export default SideMenu;
