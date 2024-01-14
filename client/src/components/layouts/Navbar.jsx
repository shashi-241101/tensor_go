import React, { useContext } from 'react';
import DarkContext from '../../context/dark/darkContext';
import iconSun from '../../images/icon-sun.svg';
import iconMoon from '../../images/icon-moon.svg';
const Navbar = () => {
  // Context
  const darkContext = useContext(DarkContext);
  const { dark, toggleDarkMode } = darkContext;

  return (
    <nav id='navbar' className={dark ? 'dark' : undefined}>
      <div id='home-icon'>
        <div id='home-icon-bot'></div>
        <div id='home-icon-circle'></div>
        <div id='home-icon-triangle'></div>
      </div>
      <div id='mode-toggle' onClick={toggleDarkMode}>
        {/* Change toggle image if in dark mode */}
        {dark ? (
          <img
          src={iconSun}
          alt='icon-sun'
        />
        ) : (
          <img
            src={iconMoon}
            alt='icon-moon'
          />
        )}
      </div>
      <div id='horizontal-line'></div>
    </nav>
  );
};

export default Navbar;
