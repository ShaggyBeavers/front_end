import { Link } from 'react-router-dom';
import './w_exhibit.css';

const WeeklyExhibit = () => {
    return (
        <div>
            <div className="weekly_exhibit">
                <div className="week_con">
                    <div className="week_left">
                        <h2 id="week-exhibit">Експонат тижня:</h2>
                        <div className="week_img">
                            <img src="assets/images/dima_wide.jpg" />
                        </div>
                    </div>
                    <div className="week_right">
                        <h2>Опис:</h2>
                        <div className="week_descr">
                            <div className="week_title">
                                <Link to={'/catalogue/1'}>
                                    <h6>
                                        Мозаїчне зображення Димитрія Солунського
                                        з Михайлівського Золотоверхого собору
                                        <br />
                                        <br />
                                    </h6>
                                </Link>
                            </div>
                            <div
                                className="week_inner"
                                style={{ marginTop: 0 }}
                            >
                                <h6>Категорія:</h6>
                                <h6 className="week_inner_small">Живопис</h6>
                            </div>
                            <div className="week_inner">
                                <h6>Підкатегорія:</h6>
                                <h6 className="week_inner_small">Мозаїка</h6>
                            </div>
                            <div className="week_inner">
                                <h6>Рік створення:</h6>
                                <h6 className="week_inner_small">1108-1113</h6>
                            </div>
                            <div className="week_inner">
                                <h6>Статус:</h6>
                                <h6 className="week_inner_small">
                                    Вкрадено(росія)
                                </h6>
                            </div>
                            <div className="week_inner">
                                <h6>Судові процеси:</h6>
                                <h6 className="week_inner_small">dsjchjkahvcnkjewdsnkjncvkesdnvcjksdncvjksnfjk</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyExhibit;
