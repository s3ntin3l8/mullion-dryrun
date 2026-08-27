import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration, truncate } from '../src/format.ts';

test('formatDuration converts milliseconds to "Xm Ys"', () => {
  assert.equal(formatDuration(90000), '1m 30s');
});

test('formatDuration handles durations under a minute', () => {
  assert.equal(formatDuration(5000), '0m 5s');
});

test('formatDuration includes hours at the one-hour boundary', () => {
  assert.equal(formatDuration(3661000), '1h 1m 1s');
});

test('formatDuration rejects negative durations', () => {
  assert.throws(() => formatDuration(-1000), (err) => {
    return err instanceof RangeError && err.message.includes('-1000');
  });
});

test('formatDuration includes a day component at 24 hours or more', () => {
  assert.equal(formatDuration(90000000), '1d 1h 0m 0s');
});

test('formatDuration day tier applies in compact mode too', () => {
  assert.equal(formatDuration(90000000, { compact: true }), '1d 1h 0m 0s');
});

test('formatDuration compact mode omits leading zero-valued tiers', () => {
  assert.equal(formatDuration(5000, { compact: true }), '5s');
});

test('formatDuration compact mode keeps a non-leading-zero tier unchanged', () => {
  assert.equal(formatDuration(3661000, { compact: true }), '1h 1m 1s');
});

test('formatDuration compact mode always keeps the trailing seconds tier', () => {
  assert.equal(formatDuration(60000, { compact: true }), '1m 0s');
});

test('formatDuration omitting opts preserves existing behavior', () => {
  assert.equal(formatDuration(90000), '1m 30s');
  assert.equal(formatDuration(5000), '0m 5s');
  assert.equal(formatDuration(3661000), '1h 1m 1s');
  assert.throws(() => formatDuration(-1000), (err) => {
    return err instanceof RangeError && err.message.includes('-1000');
  });
});

test('truncate returns the string unchanged when shorter than maxLength', () => {
  assert.equal(truncate('hi', 5), 'hi');
});

test('truncate returns the string unchanged when exactly at maxLength', () => {
  assert.equal(truncate('hello', 5), 'hello');
});

test('truncate shortens and appends an ellipsis when longer than maxLength', () => {
  assert.equal(truncate('hello world', 5), 'hell…');
});
