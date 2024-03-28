
import React from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <div className="home-container text-center">
      
      <div className="game-container">
        <div className="ping-pong-table">
          <div className="ping-pong-ball"></div>
        </div>
        
        <h1 className="mx-auto">{t('home.welcome')}</h1> {/* Use the translated text */}
        

      </div>
    </div>
  );
};

export default Home;
