import React, { useState, useEffect } from 'react';
import './not_for_safari_user.css';
import Logo404 from '../icons/logo404';
import { Link } from 'react-router-dom';

const NotForSafariUser = () => {
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
      const userAgent = window.navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      const isUserAccepted = localStorage.getItem('userAccepted');
  
      if (!isUserAccepted && (isSafari)) {
          setShowBanner(true);
      } else {
          setShowBanner(false);
      }
  }, []);

    const handleButtonClick = () => {
        localStorage.setItem('userAccepted', 'true');
        setShowBanner(false);
    };

    if (showBanner) {
        return (
            <div className="not_for_safari_user_con">
                <div className="not_for_safari_user">
                    <Logo404 />
                    <h3>Даний веб-сайт може не коректно працювати у вашому браузері - Safari<br/>
                    Для кращого досвіду користування, зайдіть з іншого браузера.
                    </h3>
                    <button onClick={handleButtonClick}>Все одно зайти</button>
                </div>
            </div>
        );
    } else {
        return null; // Don't render anything if not Safari or Chrome, or if the banner is hidden
    }
};

export default NotForSafariUser;
