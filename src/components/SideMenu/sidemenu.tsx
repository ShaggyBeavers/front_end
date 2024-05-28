import React, { useState } from 'react';
import Modal from 'react-modal';
import './sidemenu.css';
import DefaultButton from '../DefaultButton/defaultbutton';
import ReactDOM from 'react-dom';
import AddRelicModal from '../Modals/AddRelicModal';
import AddModeratorModal from '../Modals/AddModeratorModal';
// import ModeratorsListModal from '../Modals/ModeratorsListModal';
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
    currentPage: string;
}

interface VideoButtonProps {
    role: RoleEnum[];
}

const VideoButton:React.FC<VideoButtonProps> = ({ role }) => {
    const videoUrl = role[0] === RoleEnum.ADMIN
        ? 'https://www.youtube.com/watch?v=ndy6QYAn49M'
        : role[0] === RoleEnum.MODERATOR || role[0] === 'REGIONAL_MODERATOR'
        ? 'https://www.youtube.com/watch?v=vdXfAeYEog8'
        : 'https://www.youtube.com/watch?v=vvuzXQ5rWZs';

    return (
        <ProtectedItems role={role}>
            <DefaultButton
                height={38}
                width={290}
                text="Переглянути відеоінструкцію"
                action={() => window.open(videoUrl, '_blank')}
            />
        </ProtectedItems>
    );
};

const SideMenu: React.FC<SideMenuProps> = ({ currentPage }) => {
    const navigate = useNavigate();
    const [isModOpen, setIsModOpen] = useState(false);
    const closeModal = () => {
        handleModal('addModerator', false);
    };
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
            content: <AddModeratorModal closeModal={closeModal} />,
            styles: 'add-moderator-window',
        },
        // moderatorsList: {
        //     isOpen: false,
        //     content: <ModeratorsListModal />,
        //     styles: 'moderators-list-window',
        // },
    });
    //@ts-ignore
    const email = useAuthStore((state) => state.user.email);
    const accessToken = useAuthStore((state) => state.accessToken);
    const userProfile = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => UserAPI.getUserProfile(),
    });

    // const handleModeratorList = () => {
    //     const currentPath = window.location.pathname;
    //     if (currentPath.endsWith('moderator-list')) {
    //         window.location.reload();
    //     } else {
    //         navigate('./moderator-list');
    //     }
    // };

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

    let firstName = '';
    let lastName = '';
    if (!userProfile.isError && !userProfile.isLoading) {
        firstName = userProfile.data?.data?.firstName;
        lastName = userProfile.data?.data?.lastName;
    }

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
                            {firstName} {lastName}
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
                    {currentPage.endsWith('moderator-list') ? (
                        <DefaultButton
                            height={38}
                            width={300}
                            text="Список звісток"
                            action={() => navigate('/profile')}
                        />
                    ) : (
                        <DefaultButton
                            height={38}
                            width={300}
                            text="Список модераторів"
                            action={() => navigate('/profile/moderator-list')}
                        />
                    )}
                </ProtectedItems>
                <ProtectedItems
                    role={[
                        RoleEnum.ADMIN,
                        RoleEnum.REGIONAL_MODERATOR,
                        RoleEnum.MODERATOR,
                    ]}
                >
                    {currentPage.endsWith('add-term') ? (
                        <DefaultButton
                            height={38}
                            width={300}
                            text="Список звісток"
                            action={() => navigate('/profile')}
                        />
                    ) : (
                        <DefaultButton
                            height={38}
                            width={300}
                            text="Додати термін"
                            action={() => navigate('/profile/add-term')}
                        />
                    )}
                </ProtectedItems>
              <VideoButton role={[RoleEnum.ADMIN]}/>
              <VideoButton role={[RoleEnum.MODERATOR,RoleEnum.REGIONAL_MODERATOR]}/>
              <VideoButton role={[RoleEnum.USER]}/>
            </div>
        </>
    );
};

export default SideMenu;
