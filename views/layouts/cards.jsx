const React = require('react');
const Card = require('./card.jsx');

const Cards = (props) => {
  const tours = Array.from(props.tours);
  const cards = tours.map((tour) => <Card tour={tour} key={tour._id} />);
  return (
    <main className="main">
      <div className="card-container">{cards}</div>
    </main>
  );
};

module.exports = Cards;
