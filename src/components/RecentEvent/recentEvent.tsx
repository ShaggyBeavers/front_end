import './recentEvent.css';

const RecentEvent = () => {
    return (
        <div>
            <div className='recent_event'>
                <div className='rec_ev_con'>
                    <div className='rec_ev_left'>
                        <h2>Останні події:</h2>
                        {/* temporarily placeholder */}
                        <img src="/temp/rec_ev_placeholder.svg" />
                    </div>
                    <div className='rec_ev_right'>

                        <div> <h3>Дата публікації:</h3>
                            {/* temporarily hardcoded */}
                            <h2>23.05.2023</h2></div>

                        <div><h3>Категорія:</h3>
                            {/* temporarily hardcoded */}
                            <h2>Виставка</h2></div>

                        <div><h3>Місце проведення:</h3>
                            {/* temporarily hardcoded */}
                            <h2>Музей Гончара</h2></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentEvent;
