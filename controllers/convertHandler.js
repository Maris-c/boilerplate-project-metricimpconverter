function ConvertHandler() {

  // Đọc phần số trong input
  this.getNum = function (input) {
    const result = input.match(/^[\d/.]+/); // lấy chuỗi số hoặc phân số ở đầu
    if (!result) return 1; // nếu không có số thì mặc định là 1

    const numStr = result[0];

    // Kiểm tra nếu có hơn 1 dấu "/"
    if ((numStr.match(/\//g) || []).length > 1) {
      return undefined;
    }

    let num;
    if (numStr.includes('/')) {
      const [n, d] = numStr.split('/');
      num = parseFloat(n) / parseFloat(d);
    } else {
      num = parseFloat(numStr);
    }

    if (isNaN(num)) return undefined;
    return num;
  };

  // Đọc phần đơn vị trong input
  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return undefined;

    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return undefined;
    return unit === 'l' ? 'L' : unit; // giữ L viết hoa
  };

  // Trả về đơn vị đích sau khi đổi
  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
  };

  // Viết đầy đủ tên đơn vị
  this.spellOutUnit = function (unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellMap[unit];
  };

  // Tính giá trị quy đổi
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
    }

    return parseFloat(result.toFixed(5));
  };

  // Chuỗi mô tả kết quả
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
  };

}

module.exports = ConvertHandler;
