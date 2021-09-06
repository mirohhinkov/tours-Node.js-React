/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require('react');

const defaultP = (props) => (
  <html lang="en">
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Access-Control-Allow-Origin" content="*" />

      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,700"
        rel="stylesheet"
      />

      <link rel="stylesheet" href="/css/style.css" />
      <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
      <title>DreamTours | {props.title}</title>
    </head>
    <body>{props.children}</body>
    <script src="/js/axios.js" />
    <script src="/js/jquery.min.js"></script>
    <script src="/js/login.js" />
  </html>
);

module.exports = defaultP;
