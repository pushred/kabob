const React = require('react');
const renderJSX = require('jsx-test-helpers').renderJSX;
const test = require('ava').test;
const List = require('@app/universal/components/list.jsx');

const testData = [{
  id: '123',
  name: 'Avocado'
}];

test('returns a list of items', t => {
  const output = renderJSX(<List data={testData} />);
  t.true(/Avocado/.test(output));
  t.pass();
});
