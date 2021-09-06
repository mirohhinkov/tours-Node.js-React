const React = require('react');

const Locations = (props) => (
  <section className="section-map">
    <div id="map" data-locations={JSON.stringify(props.tour.locations)}></div>
  </section>
);

module.exports = Locations;
