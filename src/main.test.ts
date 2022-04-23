import { run } from './main1'

test('the data is peanut butter', () => {
  expect(1).toBe(1)
});

test('greeting', () => {
  expect(run()).toBeTruthy()
});
