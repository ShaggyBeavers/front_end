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
                        <div className='week_descr'>
                            <div className='week_title'><h6>Мозаїчне зображення Димитрія Солунського з Михайлівського Золотоверхого собору<br /><br /></h6></div>
                            <div>
                                <h6 className='week_category'>Категорія</h6>
                                <h6>Живопис</h6>
                            </div>
                            <div>
                                <h6 className='week_category'>Підкатегорія</h6>
                                <h6>Мозаїка</h6>
                            </div>
                            <div>
                                <h6 className='week_category'>Рік створення</h6>
                                <h6>1108-1113</h6>
                            </div>
                            <div>
                                <h6 className='week_category'>Статус</h6>
                                <h6>Вкрадено(росія)</h6>
                            </div>
                            <div>
                                <h6 className='week_category'>Судові процеси</h6>
                                <h6>-</h6>
                            </div>
                            <div>
                                <h6 className='week_category'>Місцезнаходження</h6>
                                <h6>Третьяковська галерея, москва</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyExhibit;
