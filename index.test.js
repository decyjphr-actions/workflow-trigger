const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
});

test('wait 500 ms', async () => {
  const start = new Date();
  await wait(500);
  const end = new Date();
  var delta = Math.abs(end - start);
  expect(delta).toBeGreaterThanOrEqual(500);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_WORKFLOW'] = "TEST";
  process.env['INPUT_TOKEN'] = "TEST"
  process.env['INPUT_REF'] = "TEST"
  process.env['INPUT_INPUTS'] = "{}"
  const ip = path.join(__dirname, 'index.js');
  try {
    console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
  } catch (error) {
    console.log(error)
  }
})
