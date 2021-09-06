/* eslint-disable react/prop-types */
const React = require('react');

const TourLayout = (props) => {
  const { tour } = props;
  return <h1>{tour.name}</h1>;
};

module.exports = TourLayout;
