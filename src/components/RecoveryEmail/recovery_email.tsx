import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './recovery_email.css';
import agent from '../../app/api/agent';

interface RecoveryEmailForm {
  email: string;
}

const RecoveryEmail: React.FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<RecoveryEmailForm>();
  const { errors } = formState;
  const [showNotFoundMessage, setShowNotFoundMessage] = React.useState(false);
  const navigate = useNavigate();

  const handleFormSubmit: SubmitHandler<RecoveryEmailForm> = async (data) => {
    try {
      await agent.Account.recoveryRequest(data);
      reset();
      setShowNotFoundMessage(false);
      navigate('/success_recovery');
    } catch (error: any) {
      if (error.response && (error.response.status === 409)) {
        reset();
        setShowNotFoundMessage(true);
      } else {
        reset();
        console.log(error)
      }
    }
  };

  return (
    <div className="recovery-email-con">
      <div className="recovery-email">
        <h3>Введіть пошту на яку прийде лист з посиланням на відновлення:</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              placeholder="введіть пошту"
              {...register('email', {
                required: { value: true, message: 'Заповніть це поле' },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Некоректний формат',
                },
              })}
            />
            <p className="recov-email-error">{errors.email?.message}</p>
          </div>
          <button type="submit">Отримати</button>
        </form>
      </div>
      {showNotFoundMessage && (
                    <div className='not_found_message_rec'>
                        <p>Акаунт не знайдено. Перевірте введені дані</p>
                    </div>
                )}
    </div>
  );
};

export default RecoveryEmail;
