/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require('react');

const defaultTour = (props) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,300i,700"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/js/Leaflet-1.7.1/css/leaflet.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

      <title>DreamTours | {props.title}</title>
    </head>
    <body>{props.children}</body>
    <script src="/js/Leaflet-1.7.1/js/leaflet.js"></script>
    <script src="/js/script.js"></script>
  </html>
);

module.exports = defaultTour;
