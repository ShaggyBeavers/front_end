import './w_exhibit.css';

const WeeklyExhibit = () => {
    return (
        <div>
            <div className='weekly_exhibit'>
                <div className='week_con'>
                    <div className='week_left'>
                        <h2>Експонат тижня:</h2>
                        <div className='week_img'><img src="/temp/rec_ev_placeholder.svg" /></div>
                    </div>
                    <div className='week_right'>
                        <h2>Опис:</h2>
                        <div className='week_descr'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyExhibit;
