import React, { useState } from 'react';
import Modal from 'react-modal';
import './sidemenu.css';
import DefaultButton from '../DefaultButton/defaultbutton';
import ReactDOM from 'react-dom';
import AddRelicModal from '../Modals/AddRelicModal';
import AddModeratorModal from '../Modals/AddModeratorModal';
import ModeratorsListModal from '../Modals/ModeratorsListModal';
import AddCategoryModal from '../Modals/AddCategoryModal';
import Settings from '../Modals/Settings';

Modal.setAppElement('#root');

interface IModal {
    [key: string]: {
        isOpen: boolean;
        content: React.ReactNode;
        styles: string;
    };
}

const SideMenu = () => {
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
        addCategory: {
            isOpen: false,
            content: <AddCategoryModal />,
            styles: 'add-category-window',
        },
    });

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
                        <h4 className="name">Бобер Грицько</h4>
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
                        <p className="email">
                            bober.na.pliazhe.lezhut@bober.ua
                        </p>
                    </div>
                </div>
                <DefaultButton
                    height={38}
                    width={300}
                    text="Додати Реліквію"
                    action={() => handleModal('addRelic', true)}
                />
                <DefaultButton
                    height={38}
                    width={300}
                    text="Додати модератора"
                    action={() => handleModal('addModerator', true)}
                />
                <DefaultButton
                    height={38}
                    width={300}
                    text="Список модераторів"
                    action={() => handleModal('moderatorsList', true)}
                />
                <DefaultButton
                    height={38}
                    width={300}
                    text="Додати Категорію"
                    action={() => handleModal('addCategory', true)}
                />
                <DefaultButton
                    height={38}
                    width={300}
                    text="Додати додаткову характеристику"
                    action={() => handleModal('addCategory', true)}
                />
            </div>
        </>
    );
};

export default SideMenu;
