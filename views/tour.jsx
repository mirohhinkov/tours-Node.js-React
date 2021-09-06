const React = require('react');
const DefaultLayout = require('./layouts/default');
const OverviewHeader = require('./layouts/overviewHeader');
const OverviewFooter = require('./layouts/overviewFooter');

function Overview(props) {
  return (
    <DefaultLayout title={props.title}>
      <OverviewHeader />
      <h1>This tour page</h1>
      <OverviewFooter />
    </DefaultLayout>
  );
}

module.exports = Overview;
