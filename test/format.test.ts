import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration } from '../src/format.ts';

test('formatDuration converts milliseconds to "Xm Ys"', () => {
  assert.equal(formatDuration(90000), '1m 30s');
});

test('formatDuration handles durations under a minute', () => {
  assert.equal(formatDuration(5000), '0m 5s');
});
