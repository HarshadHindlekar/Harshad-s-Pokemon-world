import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="frame">
        <h1 className="frame__title">Harshad's Pokemon World</h1>
        <span className="frame__credits">
          Copyright {new Date().getFullYear()}.<br /> All Rights Reserved By{' '}
          <a href="https://harshad-portfolio.vercel.app/">Harshad Hindlekar</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
