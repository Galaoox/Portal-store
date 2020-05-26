const helpers: any = {};

helpers.isSelected = (value: any, key: any) => {
  console.log(value, key);
  return value === key ? "selected" : "";
};

module.exports = helpers;
