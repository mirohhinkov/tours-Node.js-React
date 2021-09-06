/* eslint-disable react/button-has-type */
const React = require('react');

const Header = () => (
  <header className="header">
    <nav className="nav nav--tours">
      <a href="/overview" className="nav__el">
        All tours
      </a>
      <form className="nav__search">
        <button className="nav__search-btn">
          <svg>
            <use href="/img/icons.svg#icon-search" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search tours"
          className="nav__search-input"
        />
      </form>
    </nav>
    <div className="header__logo">
      <img src="/img/logo-white.png" alt="Natours logo" />
    </div>
    <nav className="nav nav--user">
      {/* <a href="#" className="nav__el">My bookings</a>
        <a href="#" className="nav__el">
          <img src="img/user.jpg" alt="User photo" class="nav__user-img" />
          <span>Jonas</span>
        </a> */}
      <a href="/login" className="nav__el">
        <button className="nav__el">LogIn </button>
      </a>
      <button className="nav__el nav__el--cta">Sign up</button>
    </nav>
  </header>
);

module.exports = Header;
