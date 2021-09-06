/* eslint-disable react/prop-types */
const React = require('react');
const DefaultLogin = require('./layouts/default.jsx');
const LoginForm = require('./layouts/loginForm.jsx');
const Header = require('./layouts/header.jsx');
const Footer = require('./layouts/footer.jsx');

const Login = ({ title }) => (
  <DefaultLogin>
    <Header />
    <LoginForm title={title} />
    <Footer />
  </DefaultLogin>
);

module.exports = Login;
