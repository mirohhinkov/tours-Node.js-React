/* eslint-disable react/prop-types */
const React = require('react');
const DefaultOverview = require('./layouts/default.jsx');
const Header = require('./layouts/header.jsx');
const Footer = require('./layouts/footer.jsx');
const Cards = require('./layouts/cards.jsx');

const Overview = (props) => {
  const { tours } = props;
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <DefaultOverview title={props.title}>
      <Header />
      <Cards tours={tours} />
      <Footer />
    </DefaultOverview>
  );
};

module.exports = Overview;
