const XLSX = require('xlsx');
const fs = require('fs');

// Load the xlsx file
const workbook = XLSX.readFile('data.xlsx');

// Initialize an empty object to store the data
const data = {};

// Iterate over each worksheet
workbook.SheetNames.forEach(sheetName => {
  // Convert each worksheet to a JSON object
  const worksheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json(worksheet);

  // Convert the sheet data to key-value pairs
  let keyValuePairs = {};
  
  sheetData.forEach(row => {
    keyValuePairs = { ...keyValuePairs, ...row }
    
  });
  // Add the key-value pairs to the object
  data[sheetName] = keyValuePairs;
});
// 转换为嵌套的对象
function convertToObject(data) {
  const result = {};
  for (const key in data) {
      if (typeof data[key] === 'object') {
          result[key] = convertToObject(data[key]);
      } else {
          const parts = key.split('.');
          let current = result;
          for (let i = 0; i < parts.length; i++) {
              if (!current[parts[i]]) {
                  current[parts[i]] = {};
              }
              if (i === parts.length - 1) {
                  current[parts[i]] = data[key];
              }
              current = current[parts[i]];
          }
      }
  }
  return result;
}
// console.log('data', data,JSON.stringify(data, null, 3));
let obj = convertToObject(data)

// Write the object back to a JavaScript file
fs.writeFileSync('result.js', `module.exports = ${JSON.stringify(obj, null, 3)};`);

console.log('saved "result.js".');
