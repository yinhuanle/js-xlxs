const XLSX = require('xlsx');

// Your multi-level JavaScript object
const data = {
  notifyTemp: {
    seted: '已设置',
    tips: {
      warning: '请插入正确的参数'
    }
  },
  a: {
    b: {
      type: '类型'
    }
  },
};

// Create a new workbook
const wb = XLSX.utils.book_new();

// Add each object as a separate worksheet
Object.entries(data).forEach(([sheetName, sheetData]) => {
  // Convert nested objects into arrays of objects
  const flatData = flattenObject(sheetData, sheetName);
  const ws = XLSX.utils.json_to_sheet([flatData]);
  ws['!cols'] = [{ wch: 30 }, { wch: 30 }]; // Adjust column width if needed
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
});

// Write the workbook to a file
XLSX.writeFile(wb, 'data.xlsx');

console.log('File created successfully!');

// Function to flatten nested objects
function flattenObject(obj, sheetName, parentKey = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = parentKey ? `${parentKey}.${key}` : `${key}`;
    if (typeof obj[key] === 'object') {
      return { ...acc, ...flattenObject(obj[key], sheetName, prefixedKey) };
    } else {
      return { ...acc, [prefixedKey]: obj[key] };
    }
  }, {});
}