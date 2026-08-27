import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration, truncate, pluralize, isPalindrome, titleCase, snakeCase } from '../src/format.ts';

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

test('pluralize uses the singular form when count is 1', () => {
  assert.equal(pluralize(1, 'item'), '1 item');
});

test('pluralize appends "s" to the singular form when count is 0', () => {
  assert.equal(pluralize(0, 'item'), '0 items');
});

test('pluralize appends "s" to the singular form when count is greater than 1', () => {
  assert.equal(pluralize(3, 'item'), '3 items');
});

test('pluralize uses an explicit irregular plural form', () => {
  assert.equal(pluralize(2, 'child', 'children'), '2 children');
  assert.equal(pluralize(1, 'child', 'children'), '1 child');
});

test('isPalindrome returns true for a simple palindrome', () => {
  assert.equal(isPalindrome('racecar'), true);
});

test('isPalindrome is case-insensitive', () => {
  assert.equal(isPalindrome('RaceCar'), true);
});

test('isPalindrome ignores spaces and punctuation', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
});

test('isPalindrome returns false for a non-palindrome', () => {
  assert.equal(isPalindrome('hello'), false);
});

test('titleCase capitalizes the first letter of each word', () => {
  assert.equal(titleCase('hello world'), 'Hello World');
});

test('titleCase lowercases the rest of each word', () => {
  assert.equal(titleCase('hELLO wORLD'), 'Hello World');
});

test('snakeCase converts a camelCase string to snake_case', () => {
  assert.equal(snakeCase('helloWorld'), 'hello_world');
});

test('snakeCase converts a space-separated string to snake_case', () => {
  assert.equal(snakeCase('hello world'), 'hello_world');
});
