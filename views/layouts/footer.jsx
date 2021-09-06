/* eslint-disable jsx-a11y/anchor-is-valid */
const React = require('react');

const Footer = (props) => (
  <footer className="footer">
    <div className="footer__logo">
      <img src="/img/logo-green.png" alt="DreamTours logo" />
    </div>
    <ul className="footer__nav">
      <li>
        <a href="#">About us</a>
      </li>
      <li>
        <a href="#">Download apps</a>
      </li>
      <li>
        <a href="#">Become a guide</a>
      </li>
      <li>
        <a href="#">Careers</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
    </ul>
    <p className="footer__copyright">
      &copy; by Miroslav Hinkov. All rights reserved.
    </p>
  </footer>
);

module.exports = Footer;
