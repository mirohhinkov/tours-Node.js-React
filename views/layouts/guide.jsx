/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require('react');

const Guide = (props) => (
  <div className="overview-box__detail">
    <img
      src={`/img/users/${props.guide.photo}`}
      alt={props.guide.name}
      className="overview-box__img"
    />
    <span className="overview-box__label">
      {props.guide.role === 'guide' ? 'Tour Guide' : 'Lead guide'}
    </span>
    <span className="overview-box__text">{props.guide.name}</span>
  </div>
);

module.exports = Guide;
