import Validator from '../Validator';

const validator = new Validator();

describe('проверка валидности введенных координат', () => {
  test.each([
    ['valid', '-89.132, 179.1231', { latitude: -89.132, longitude: 179.1231, result: true }],
    ['valid', '-89.132,179.1231', { latitude: -89.132, longitude: 179.1231, result: true }],
    ['valid', '[-89.132, 179.1231]', { latitude: -89.132, longitude: 179.1231, result: true }],
    ['invalid', '9.132, 6179.1231', { errorMessage: 'Долгота не может быть больше 180', result: false }],
    ['invalid', '9.132, -6179.1231', { errorMessage: 'Долгота не может быть меньше -180', result: false }],
    ['invalid', '999.132, 179.1231', { errorMessage: 'Широта не может быть больше 90', result: false }],
    ['invalid', '-999.132, -179.1231', { errorMessage: 'Широта не может быть меньше -90', result: false }],
    ['invalid', '132, 1231', { errorMessage: 'Введите 2 числа с целой и дробной частью', result: false }],
    ['invalid', 'qwerty', { errorMessage: 'Введите 2 числа с целой и дробной частью', result: false }],
    ['invalid', '123456789', { errorMessage: 'Введите 2 числа с целой и дробной частью', result: false }],
    ['invalid', '', { errorMessage: 'Введите 2 числа с целой и дробной частью', result: false }],
    ['invalid', '-89.-132, 179.-1231', {errorMessage: 'Дробная часть не может быть отрицательной', result: false }],
  ])(('Кординаты %s'), (_, input, expected) => {
    const value = (input).match(/(-?\d+)/gm);
    expect(validator.getCheckValue(value)).toStrictEqual(expected);
  });
});
