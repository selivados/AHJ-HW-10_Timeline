import GeoModal from '../GeoModal';

describe('Validate function', () => {
  test.each([
    ['51.50851 -0.12572', false],
    ['151.50851, -0.12572', false],
    ['51.50851, -1000.12572', false],
    ['51.508, -0.12572', false],
    ['51.50851, -0.125', false],
  ])('(%s) should return false', (str, expected) => {
    const result = GeoModal.validate(str);

    expect(result).toEqual(expected);
  });

  test.each([
    ['51.50851, -0.12572', { latitude: 51.50851, longitude: -0.12572 }],
    ['51.50851,-0.12572', { latitude: 51.50851, longitude: -0.12572 }],
    ['-51.50851, 0.12572', { latitude: -51.50851, longitude: 0.12572 }],
    ['[51.50851, -0.12572]', { latitude: 51.50851, longitude: -0.12572 }],
    ['[-51.50851,0.12572]', { latitude: -51.50851, longitude: 0.12572 }],
  ])('(%s) should return object', (str, expected) => {
    const result = GeoModal.validate(str);

    expect(result).toEqual(expected);
  });
});
