import { FieldValues, useForm } from 'react-hook-form'
import './login.css';
import agent from '../../app/api/agent';
import React from 'react';

export default function Login() {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const [showNotFoundMessage, setShowNotFoundMessage] = React.useState(false);


    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.login(data);
        } catch (error:any) {
            if(error.response.status===404){
                reset();
                setShowNotFoundMessage(true);
            }else{

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
                                // placeholder={(errors.email ? errors.email.message : 'введіть пошту') as string}
                                placeholder='введіть пошту'
                                {...register('email', { required: { value: true, message: 'Заповніть це поле' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'invalid format' } })}
                            />
                            <p className=''>{errors.email?.message as string}</p>
                        </div>


                        <div className={`login_input ${errors.password ? 'error' : ''}`}>
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Заповніть це поле'})}
                                // placeholder={(errors.password ? errors.password.message : 'введіть пароль') as string}
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
                            <button id='log_google'>Увійти з <img src="./icons/google.svg" style={{ width: '20px', height: '20px' }} />
                            </button>
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
