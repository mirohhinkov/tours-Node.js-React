const React = require('react');

const BoxDetails = (props) => (
  <div className="overview-box__detail">
    <svg className="overview-box__icon">
      <use href={`/img/icons.svg#icon-${props.icon}`}></use>
    </svg>
    <span className="overview-box__label">{props.lavel}</span>
    <span className="overview-box__text">{props.text}</span>
  </div>
);

module.exports = BoxDetails;
