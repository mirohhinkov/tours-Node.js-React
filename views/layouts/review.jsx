const React = require('react');

const Review = (props) => {
  const stars = [];
  for (let i = 0; i < 5; i++)
    stars.push(
      props.review.rating >= i + 1 ? (
        <svg className="reviews__star reviews__star--active">
          <use href="/img/icons.svg#icon-star"></use>
        </svg>
      ) : (
        <svg className="reviews__star reviews__star--inactive">
          <use href="/img/icons.svg#icon-star"></use>
        </svg>
      )
    );
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`/img/users/${props.review.user.photo}`}
          alt={props.review.user.name}
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{props.review.user.name}</h6>
      </div>
      <p className="reviews__text">{props.review.review}</p>
      <div className="reviews__rating">{stars}</div>
    </div>
  );
};

module.exports = Review;
