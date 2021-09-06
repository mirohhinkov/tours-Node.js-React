/* eslint-disable react/prop-types */
const React = require('react');
const Picture = require('./picture.jsx');

const Pictures = (props) => {
  let i = 0;
  const pics = props.tour.images.map((pic) => {
    i++;
    return (
      <Picture url={pic} name={props.tour.name} ind={i} key={props.tour._id} />
    );
  });

  return <section className="section-pictures">{pics}</section>;
};

module.exports = Pictures;
