import { SubmitHandler, useForm } from 'react-hook-form';
import './report.css';
import agent from '../../app/api/agent';

interface ReportForm {
  name: string,
  category: string,
  location: string,
  sources: string,
  description: string,
  photos: File[],
}

export default function Report() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<ReportForm>();
  const { errors } = formState;

  const submitForm: SubmitHandler<ReportForm> = async (data) => {
    try {
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

  const categories = ["Category 1", "Category 2", "Category 3"];

  return (
    <div className='report'>
      <div className='report_con'>
        <div className='report_form'>
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <div className='report_group'>
              <div className={`report_input ${errors.name ? 'error' : ''}`}>
                <label htmlFor="name">Назва:</label>
                <input
                  type="text"
                  placeholder="Введіть назву"
                  {...register('name', {
                    required: 'Заповніть це поле', minLength: {
                      value: 2,
                      message: 'Мінімальна довжина - 2 символи',
                    },
                  })} />
                <p>{errors.name?.message as string}</p>
              </div>
              <div className={`report_input ${errors.category ? 'error' : ''}`}>
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
          </form>
        </div>
      </div>
    </div>
  )
};
