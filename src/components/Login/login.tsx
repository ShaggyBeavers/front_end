import { FieldValues, useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import './login.css';
import agent from '../../app/api/agent';


export default function Login() {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const [showNotFoundMessage, setShowNotFoundMessage] = React.useState(false);

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.login(data);
        } catch (error: any) {
            if (error.response.status === 403 || error.response.status === 401) {
                reset();
                setShowNotFoundMessage(true);
            } else {

            }
        }
    }

   
    return (
        <div className="login">
            <div className='login_con'>
                <div className='login_form'>
                    <h2>Вхід</h2>
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div className={`login_input ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Пошта:</label>
                            <input
                                type="email"
                                placeholder='введіть пошту'
                                {...register('email', { required: { value: true, message: 'Заповніть це поле' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Некоректний формат' } })}
                            />
                            <p className=''>{errors.email?.message as string}</p>
                        </div>


                        <div className={`login_input ${errors.password ? 'error' : ''}`}>
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Заповніть це поле' })}                                
                                placeholder='введіть пароль'
                            />
                            <p>{errors.password?.message as string}</p>
                        </div>


                        <div className='log_recovery'>
                            <p>Забув пароль?</p>
                            <a href="/recovery">Відновити</a>
                        </div>

                        <div className='login_btns'>
                            <button type="submit" id='log_btn'>Увійти</button>
                            <GoogleLogin
                            //temporarily hardcoded
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                shape='pill'
                                size='medium'                                
                            />
                        </div>
                    </form>
                </div>
                {showNotFoundMessage && (
                    <div className='not_found_message'>
                        <p>Акаунт не знайдено. Перевірте введені дані</p>
                    </div>
                )}
            </div>
        </div>
    )
}
