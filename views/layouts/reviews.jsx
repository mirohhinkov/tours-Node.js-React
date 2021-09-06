const React = require('react');
const Review = require('./review.jsx');

const Reviews = (props) => {
  const revs = props.reviews.map((review) => (
    <Review review={review} key="review._id" />
  ));
  return (
    <section className="section-reviews">
      <div className="reviews">{revs}</div>
    </section>
  );
};
module.exports = Reviews;
