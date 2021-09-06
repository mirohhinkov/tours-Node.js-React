/* eslint-disable react/prop-types */
const React = require('react');

const Cta = (props) => (
  <section className="section-cta">
    <div className="cta">
      <div className="cta__img cta__img--logo">
        <img src="/img/logo-white.png" alt="DreamsTour logo" className="" />
      </div>
      <img
        src={`/img/tours/${props.tour.images[0]}`}
        alt="Tour 1"
        className="cta__img cta__img--1"
      />
      <img
        src={`/img/tours/${props.tour.images[1]}`}
        alt="Tour 2"
        className="cta__img cta__img--2"
      />

      <div className="cta__content">
        <h2 className="heading-secondary">What are you waiting for?</h2>
        <p className="cta__text">
          {props.tour.duration} days. 1 adventure. Infinite memories. Make it
          yours today!
        </p>
        <button className="btn btn--green span-all-rows">Book tour now!</button>
      </div>
    </div>
  </section>
);
module.exports = Cta;
