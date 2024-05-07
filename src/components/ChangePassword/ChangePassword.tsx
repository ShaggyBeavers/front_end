import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import user from '../../../src/app/api/Account/User/user';

interface ChangePasswordForm {
    password: string;
    confirmPassword: string;
}

const ChangePassword: React.FC<{ token: string }> = ({ token }) => {
    console.log('Inside: ', token);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<ChangePasswordForm>();
    const [passwordRequirements, setPasswordRequirements] = useState<{
        length: boolean | null;
        number: boolean | null;
        uppercase: boolean | null;
    }>({
        length: null,
        number: null,
        uppercase: null,
    });

    const mutation = useMutation({
        mutationFn: (values: {
            token: string;
            password: string;
            passwordConfirmation: string;
        }) => user.newPassword(values),
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error: any) => {
            console.log(error);
            if (error.response && error.response.status === 409) {
                // resetFormState(true);
            } else {
                // resetFormState();
            }
        },
    });

    const submitForm = (data: ChangePasswordForm) => {
        mutation.mutate({
            token: token,
            password: data.password,
            passwordConfirmation: data.confirmPassword,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPasswordRequirements({
            length: password.length >= 8,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
        });
    };

    return (
        <div className="register">
            <div className="register_con">
                <div className="register_form">
                    <h3>Зміна пароля</h3>
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div
                            className={`register_input ${errors.password ? 'error' : ''}`}
                        >
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Заповніть це поле',
                                    minLength: {
                                        value: 8,
                                        message: '',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: '',
                                    },
                                })}
                                placeholder="введіть пароль"
                                onChange={handlePasswordChange}
                            />
                            <p>{errors.password?.message as string}</p>
                        </div>

                        <div
                            className={`register_input ${errors.confirmPassword ? 'error' : ''}`}
                        >
                            <label htmlFor="confirmPassword">
                                Повторіть пароль:
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Заповніть це поле',
                                    validate: (value) =>
                                        value === getValues('password') ||
                                        'Паролі не співпадають',
                                })}
                                placeholder="повторіть пароль"
                            />
                            <p>{errors.confirmPassword?.message as string}</p>
                        </div>

                        <div className="register_btns">
                            <button type="submit" id="log_btn">
                                Змінити пароль
                            </button>
                        </div>
                    </form>
                </div>
                {passwordRequirements.length !== null && (
                    <div className="password_message">
                        <p>Вимоги до пароля</p>
                        {Object.entries(passwordRequirements).map(
                            ([requirement, fulfilled]) => (
                                <div key={requirement}>
                                    <p
                                        style={{
                                            color: fulfilled
                                                ? '#19BE6F'
                                                : 'red',
                                        }}
                                    >
                                        <span style={{ color: 'black' }}>
                                            &#8226;
                                        </span>
                                        {requirement === 'length'
                                            ? ' 8 символів'
                                            : requirement === 'number'
                                              ? ' 1 число'
                                              : ' 1 буква у верхньому регістрі'}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
