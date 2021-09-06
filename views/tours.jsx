/* eslint-disable react/prop-types */
const React = require('react');

const DefaultTour = require('./layouts/defaultTour.jsx');
const Header = require('./layouts/header.jsx');
const Footer = require('./layouts/footer.jsx');
const TourSectionHeader = require('./layouts/tourSectionHeader.jsx');
const TourSectionDescription = require('./layouts/tourSectionDescription.jsx');
const Pictures = require('./layouts/pictures.jsx');
const Reviews = require('./layouts/reviews.jsx');
const Cta = require('./layouts/cta.jsx');
const Locations = require('./layouts/locations.jsx');

const Tours = (props) => {
  const { tour } = props;
  console.log(tour.locations);
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <DefaultTour title={props.tour.name}>
      <Header />
      <TourSectionHeader tour={tour} />
      <TourSectionDescription tour={tour} />
      <Pictures tour={tour} />
      <Locations tour={tour} />
      <Reviews reviews={tour.reviews} />
      <Cta tour={tour} />
      <Footer />
    </DefaultTour>
  );
};

module.exports = Tours;
