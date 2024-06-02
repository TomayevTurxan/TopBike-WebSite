import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function Online() {
  const calculateTimeLeft = () => {
    // Set the end date for the promotion (replace with your actual end date)
    const promotionEndDate = new Date('2024-04-10T00:00:00Z');
    const now = new Date();

    const difference = promotionEndDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section id='onlyOnlineSection'>
      <div className="onlineBox">
        <div className="onlyTextBox">
          <h3>Only Online</h3>
        </div>
        <div className="timerBox">
          <div className="time">
            <p>{timeLeft.days}</p>
            <span>Days</span>
          </div>
          <div className="time">
            <p>{timeLeft.hours}</p>
            <span>Hours</span>
          </div>
          <div className="time">
            <p>{timeLeft.minutes}</p>
            <span>Mins</span>
          </div>
          <div className="time">
            <p>{timeLeft.seconds}</p>
            <span>Sec</span>
          </div>
        </div>
        <div className="onlyTextsBox">
          <p>GET 30% OFF YOUR ORDER OF $100 OR MORE</p>
          <span>USE CODE “TOPBIKE30”</span>
        </div>
        <div className="onlyShopBtn">
          <button>
            <Link style={{color:"white"}} to={'/shop'}>Shop Now</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Online;
