const React = require('react');
const DefaultLayout = require('./layouts/default');
const OverviewHeader = require('./layouts/overviewHeader');
const OverviewFooter = require('./layouts/overviewFooter');

function StartPage(props) {
  return (
    <DefaultLayout title={props.title}>
      <OverviewHeader />
      <OverviewFooter />
    </DefaultLayout>
  );
}

module.exports = StartPage;
