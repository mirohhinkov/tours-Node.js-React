/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
const React = require('react');

const LoginForm = () => (
  <main className="main">
    <div className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
      <form className="form">
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="form__input"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form__group.ma-bt-md">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
          />
        </div>
        <div className="form__group">
          <button className="btn btn--green">Login</button>
        </div>
      </form>
    </div>
  </main>
);

module.exports = LoginForm;
