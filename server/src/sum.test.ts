import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 6)).toBe(7);
});

test('sub 1 + 4 to be equal 5', () => {
    expect(sum(1, 4)).toBe(5);
});
