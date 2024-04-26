const XLSX = require('xlsx');
const fs = require('fs');

// Load the xlsx file
const workbook = XLSX.readFile('翻译.xlsx');

// Initialize an empty object to store the data
let sheetData = {};
// console.log('workbook', workbook);
// Iterate over each worksheet
workbook.SheetNames.forEach(sheetName => {
  // Convert each worksheet to a JSON object
  const worksheet = workbook.Sheets[sheetName];
  sheetData = XLSX.utils.sheet_to_json(worksheet);

  // console.log('sheetData', sheetData);

});
// 转换为嵌套的对象
function convertToEnObject(array) {
  const enObject = {};
  array.forEach(item => {
    const keys = item.Keys?.split('.'); // Split Keys by '.' to create nested objects
    let currentObj = enObject;

    if(keys.length ===  1) {
      currentObj[keys[0]] = item.En;
      return;
    }
    for (let i = 0; i < keys?.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        currentObj[key] = item.En;
      } else {
        currentObj[key] = currentObj[key] || {}; // Create nested object if it doesn't exist
        currentObj = currentObj[key]; // Move to the next nested object
      }
    }
  });
  return enObject;
}

let obj = convertToEnObject(sheetData)
console.log('obj', obj)
// Write the object back to a JavaScript file
fs.writeFileSync('result.js', `module.exports = ${JSON.stringify(obj, null, 3)};`);

console.log('saved "result.js".');
