import './index.css';
import DefaultButton from '../../DefaultButton/defaultbutton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRelicModal = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        isReturned: false,
        isLost: false,
        isMain: true,
    });

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h4 className="header-add">Яку інформацію ви бажаєте записати?</h4>
            <p className="hint-add">Можете вибрати декілька опцій</p>

            <div className="row-add">
                <DefaultButton
                    height={40}
                    width={150}
                    text={'Про повернуту'}
                    action={() =>
                        setSelectedOptions((prevState) => ({
                            ...prevState,
                            isReturned: !prevState.isReturned,
                        }))
                    }
                    selected={selectedOptions.isReturned}
                />
                <DefaultButton
                    height={40}
                    width={150}
                    text={'Про основну'}
                    action={() =>
                        setSelectedOptions((prevState) => ({
                            ...prevState,
                            isMain: !prevState.isMain,
                        }))
                    }
                    selected={selectedOptions.isMain}
                />
                <DefaultButton
                    height={40}
                    width={150}
                    text={'Про загублену'}
                    action={() =>
                        setSelectedOptions((prevState) => ({
                            ...prevState,
                            isLost: !prevState.isLost,
                        }))
                    }
                    selected={selectedOptions.isLost}
                />
            </div>
            <div className="last-row-add">
                <DefaultButton
                    height={40}
                    width={114}
                    text={'Зберегти'}
                    action={
                        () =>
                            navigate('/add-relic', {
                                state: {
                                    isReturned: selectedOptions.isReturned,
                                    isMain: selectedOptions.isMain,
                                    isLost: selectedOptions.isLost,
                                },
                            })
                        // console.log({
                        //     isReturned: selectedOptions.isReturned,
                        //     isMain: selectedOptions.isMain,
                        //     isLost: selectedOptions.isLost,
                        // })
                    }
                />
            </div>
        </div>
    );
};

export default AddRelicModal;
