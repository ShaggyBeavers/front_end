import { SubmitHandler, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import './report.css';
import agent from '../../app/api/agent';
import { useEffect, useState } from 'react';

interface ReportForm {
  name: string,
  category: string,
  location: string,
  sources: string[],
  description: string,
  photos: File[],
}

export default function Report() {
  const { register, handleSubmit, formState, reset } = useForm<ReportForm>();
  const { errors } = formState;
  const [remainingChars, setRemainingChars] = useState(3);
  const [isTyping, setIsTyping] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const submitForm: SubmitHandler<ReportForm> = async (data) => {

    data.sources = urlInput.split(' ').filter(url => url.trim() !== '');
    try {
      console.log(data.sources)
      await agent.Account.report(data);
      reset();
    } catch (error: any) {
      if (error.response.status === 409) {
        reset();
        // setShowExistsMessage(true);
      } else {
        console.log(error)
        // setShowExistsMessage(false);
      }
    }
  }

  const categories = ["Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3", "Category 1", "Category 2", "Category 3"];

  return (
    <div className='report'>
      <div className='report_con'>
        <div className='report_form'>
          <form onSubmit={handleSubmit(submitForm)} noValidate>

            <div className='report_group'>
              <div className={`report_input ${errors.name ? 'error' : ''}`} style={{ width: '45%' }}>
                <label htmlFor="name">Назва:</label>
                <input
                  type="text"
                  placeholder="Введіть назву артефакту"
                  {...register('name', {
                    required: 'Заповніть це поле', minLength: {
                      value: 2,
                      message: 'Мінімальна довжина - 2 символи',
                    },
                  })} />
                <p>{errors.name?.message as string}</p>
              </div>

              <div className={`report_input ${errors.category ? 'error' : ''}`} style={{ width: '45%' }}>
                <label htmlFor="category">Категорія:</label>
                <select
                  {...register('category', {
                    required: 'Оберіть категорію',
                  })}
                >
                  <option value="" disabled selected>
                    Оберіть категорію
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <p>{errors.category?.message as string}</p>
              </div>
            </div>

            <div className='report_group'>
              <div className={`report_input ${errors.location ? 'error' : ''}`} style={{ width: '60%' }}>
                <label htmlFor="location">Ймовірне місце розташування:<p style={{ color: '#DADADA' }}>(опційно)</p></label>
                <input
                  type="text"
                  placeholder="Введіть місце розташування"
                  {...register('location', {
                    minLength: {
                      value: 2,
                      message: 'Мінімальна довжина - 2 символи',
                    },
                  })} />
                <p>{errors.location?.message as string}</p>
              </div>

            {/* HERE GO PICS */}

            </div>

            <div className='report_group'>
              <div className='report_input' style={{ width: '100%' }}>
                <label htmlFor="description">Опис:<p style={{ color: '#DADADA' }}>(опційно)</p></label>
                <textarea
                  rows={4}
                  maxLength={300}
                  placeholder="Введіть опис до 300 символів"
                  {...register('description')}
                  onChange={(e) => {
                    const inputLength = e.target.value.length;
                    const maxLength = 300;
                    const remainingChars = maxLength - inputLength;
                    setRemainingChars(remainingChars);
                    setIsTyping(true);
                  }}
                  onBlur={() => setIsTyping(false)}
                />
                {isTyping && <p style={{ fontSize: '11px' }}>Залишилось символів: {remainingChars}</p>}
              </div>
            </div>

            <div className='report_group'>
              <div className={`report_input`} style={{ width: '100%' }}>
                <label htmlFor="urls">Джерела:<p style={{ color: '#DADADA' }}>(опційно)</p></label>
                <input
                  type="text"
                  placeholder="Введіть посилання через пробіл"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
            </div>


            <button type="submit">Опублікувати</button>

          </form>
        </div>
      </div>
    </div>
  )
};
