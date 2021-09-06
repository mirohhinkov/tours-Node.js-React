const React = require('react');

const TourSectionHeader = (props) => (
  <section className="section-header">
    <div className="header__hero">
      <div className="header__hero-overlay">&nbsp;</div>
      <img
        className="header__hero-img"
        src={`/img/tours/${props.tour.imageCover}`}
        alt={`${props.tour.name}`}
      />
    </div>
    <div className="heading-box">
      <h1 className="heading-primary">
        <span>{props.tour.name}</span>
      </h1>
      <div className="heading-box__group">
        <div className="heading-box__detail">
          <svg className="heading-box__icon">
            <use href="/img/icons.svg#icon-clock"></use>
          </svg>
          <span className="heading-box__text">{`${props.tour.duration} days`}</span>
        </div>
        <div className="heading-box__detail">
          <svg className="heading-box__icon">
            <use href="/img/icons.svg#icon-map-pin"></use>
          </svg>
          <span className="heading-box__text">
            {props.tour.startLocation.description}
          </span>
        </div>
      </div>
    </div>
  </section>
);
module.exports = TourSectionHeader;
