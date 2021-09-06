/* eslint-disable react/prop-types */
const React = require('react');

const Picture = (props) => (
  <div className="picture-box">
    <img
      className={`picture-box__img picture-box__img--${props.ind}`}
      src={`/img/tours/${props.url}`}
      alt={props.name}
    />
  </div>
);

module.exports = Picture;
