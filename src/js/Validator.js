export default class Validator {
  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.wholeDigit = null;
    this.fractionalDigit = null;
  }

  collectionNumber(integer, fractional) {
    this.integerNum = Number(integer);
    this.fractionalNum = Number(fractional) / 10 ** fractional.length;
    if (this.integerNum < 0 || (this.integerNum === 0 && this.integer.charAt(0) === '-')) {
      return this.integerNum - this.fractionalNum;
    }
    return this.integerNum + this.fractionalNum;
  }

  getCheckValue(value) {
    if (!value || value.length !== 4) {
      return {
        result: false,
        errorMessage: 'Введите 2 числа с целой и дробной частью',
      };
    }

    if (Number(value[1]) < 0 || Number(value[3] < 0)) {
      return {
        result: false,
        errorMessage: 'Дробная часть не может быть отрицательной',
      };
    }

    this.latitude = this.collectionNumber(value[0], value[1]);
    this.longitude = this.collectionNumber(value[2], value[3]);

    if (Number(value[0]) > 90) {
      return {
        result: false,
        errorMessage: 'Широта не может быть больше 90',
      };
    }

    if (Number(value[0]) < -90) {
      return {
        result: false,
        errorMessage: 'Широта не может быть меньше -90',
      };
    }

    if (Number(value[2]) > 180) {
      return {
        result: false,
        errorMessage: 'Долгота не может быть больше 180',
      };
    }

    if (Number(value[2]) < -180) {
      return {
        result: false,
        errorMessage: 'Долгота не может быть меньше -180',
      };
    }

    return {
      result: true,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
