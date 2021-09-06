/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
const React = require('react');
const BoxDetails = require('./boxDetails.jsx');
const Guides = require('./guides.jsx');
const DescriptionBlock = require('./descriptionBlock.jsx');

const TourSectionDescription = (props) => {
  const date = props.tour.startDates[0].toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            {/* calendar 'Next date' data */}
            <BoxDetails icon="calendar" label="Next date" text={date} />
            <BoxDetails
              icon="trending-up"
              label="Difficulty"
              text={props.tour.difficulty}
            />
            <BoxDetails
              icon="user"
              label="Participants"
              text={`${props.tour.maxGroupSize} people`}
            />
            <BoxDetails
              icon="star"
              label="Rating"
              text={`${props.tour.ratingAverage} / ${props.tour.ratingsQuantity}`}
            />
          </div>
          <Guides guides={props.tour.guides} />
        </div>
      </div>

      <DescriptionBlock tour={props.tour} />
    </section>
  );
};

module.exports = TourSectionDescription;
