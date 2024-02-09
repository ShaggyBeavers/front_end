import './index.css';

import { Button } from '../ui/button';
import AddMainRelic from './add-main-relic-form';
import { AddSecondaryRelicForm } from './add-secondary-relic-form';
import { AddTertiaryRelicForm } from './add-tertiary-relic-form';


const AddRelic = ({ form }: any) => {
    return (
        <>
            <AddMainRelic form={form} />
            <AddSecondaryRelicForm form={form}/>
            <AddTertiaryRelicForm form={form}/>
        </>
    );
};

export default AddRelic;
