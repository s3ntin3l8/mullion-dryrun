import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration } from '../src/format.ts';

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
