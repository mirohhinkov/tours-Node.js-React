const React = require('react');

const Guide = require('./guide.jsx');

const Guides = (props) => {
  const guides = props.guides.map((guide) => (
    <Guide guide={guide} key={guide._id} />
  ));
  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
      {guides}
    </div>
  );
};

module.exports = Guides;
