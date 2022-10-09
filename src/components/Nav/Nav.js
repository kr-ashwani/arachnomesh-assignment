import React from 'react';
import './Nav.css';

import siteLogo from '../../assets/download.png';

const Nav = () => {
  return (
    <header>
      <div className="logo">
        <a href="#home">
          <img className="logo" src={siteLogo} alt="logo" />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#2021">2021</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="benefits">Benefits</a>
          </li>
          <li>
            <a href="categories">Categories</a>
          </li>
          <li>
            <a href="voting">Voting</a>
          </li>
          <li>
            <a href="#Contact">contact</a>
          </li>
          <li>
            <a href="#Login">login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
