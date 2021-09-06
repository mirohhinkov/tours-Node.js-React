const React = require('react');

const CardHeader = (props) => {
  console.log(props);
  return (
    <div className="card__header">
      <div className="card__picture">
        <div className="card__picture-overlay">&nbsp;</div>
        <img
          src={props.data.imageCover}
          alt="Tour 1"
          className="card__picture-img"
        />
      </div>

      <h3 className="heading-tertirary">
        <span>{props.data.name}</span>
      </h3>
    </div>
  );
};

module.exports = CardHeader;
