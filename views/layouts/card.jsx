/* eslint-disable react/prop-types */
const React = require('react');

const CardHeader = require('./cardHeader.jsx');
const CardFooter = require('./cardFooter.jsx');

const Card = (props) => {
  const { tour } = props;
  const header = {
    imageCover: `/img/tours/${tour.imageCover}`,
    name: tour.name,
  };
  const startDates = Array.from(tour.startDates);
  const startDate = new Date(startDates[0]);
  return (
    <div className="card">
      <CardHeader data={header} />

      <div className="card__details">
        <h4 className="card__sub-heading">
          {tour.difficulty} {tour.duration}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-map-pin" />
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-calendar" />
          </svg>
          <span>
            {startDate.toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-flag" />
          </svg>
          <span>{tour.locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use href="/img/icons.svg#icon-user" />
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <CardFooter tour={tour} />
    </div>
  );
};

module.exports = Card;
