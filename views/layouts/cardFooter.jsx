/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require('react');

const CardFooter = (props) => (
  <div className="card__footer">
    <p>
      <span className="card__footer-value">{props.tour.price}</span>
      <span className="card__footer-text">per person</span>
    </p>
    <p className="card__ratings">
      <span className="card__footer-value">{props.tour.ratingAverage}</span>
      <span className="card__footer-text">
        rating ({props.tour.ratingsQuantity})
      </span>
    </p>
    <a href={`/tours/${props.tour.slug}`} className="btn btn--green btn--small">
      Details
    </a>
  </div>
);

module.exports = CardFooter;
