/* eslint-disable react/prop-types */
const React = require('react');

const DescriptionBlock = (props) => {
  const paras = props.tour.description.split('\n').map((para, i) => (
    <p className="description__text" key={i}>
      {para}
    </p>
  ));
  return (
    <div className="description-box">
      <h2 className="heading-secondary ma-bt-lg">
        About {props.tour.name} tour
      </h2>
      {paras}
    </div>
  );
};
module.exports = DescriptionBlock;
