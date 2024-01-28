import './recentEvent.css';

const RecentEvent = () => {
    return (
        <div>
            <div className="recent_event">
                <div className="rec_ev_con">
                    <div className="rec_ev_top">
                        <h2 id="recent-event">Останні події:</h2>
                        <div className="rec_head">
                            <h3>
                                В Іспанії вилучили незаконно вивезені з України
                                старовинні золоті артефакти на 64 млн $
                            </h3>
                            <h6>23 жовт.2023</h6>
                        </div>
                    </div>
                    <div className="rec_ev_bot">
                        <div className="rec_ev_left">
                            <h5>
                                Мадридська поліція затримала 5 осіб, які
                                намагалися продати намиста, браслети та сережки,
                                що датуються греко-скіфським періодом між VIII
                                та IV ст. до нашої ери
                                <br />
                                <br />
                                Загалом вилучили 11 предметів та ...
                            </h5>
                            <a href="#">Читати більше</a>
                        </div>
                        <div className="rec_ev_right">
                            <img
                                src="./icons/rec_ev_line.svg"
                                className="rec_ev_line"
                            />
                            <img
                                src="./temp/rec_ev_placeholder.svg"
                                className="rec_ev_pic"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentEvent;
