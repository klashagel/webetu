import React from 'react';
import '../styles/Home.css'; // Importing the CSS file
import Etu from '../components/Etu'; // Importing the Etu component

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <Etu /> 

      </main>
    </div>
  );
};

export default Home;
