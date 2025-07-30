const XLSX = require('xlsx');
(async() => {
  const prez = [
    {
      // 需要翻译的内容
      me: '我',
      notifyTemp: {
        seted: '已设置',
        tips: {
          warning: '请插入正确的参数'
        }
      },
    }
  ]

  /* flatten objects */
  let rows = []
  prez.forEach(row => {
      flattenObject(row)
    
  });

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet");

  /* fix headers */
  let values = ["Keys", "Zh", "En"]
  let arr = []
  XLSX.utils.sheet_add_aoa(worksheet, [values], { origin: "A1" });

  /* calculate column width */
  // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  let length = values.length < 200 ? 200 : Object.keys(sheetData).length
  for (let colIndex = 0; colIndex < length; colIndex++) {
    arr.push({ wch: 50 })
  }
  worksheet["!cols"] = arr;

  /* create an XLSX file and try to save to .xlsx */
  XLSX.writeFile(workbook, "翻译.xlsx");
  console.log('File created successfully!');


  // Function to flatten nested objects
  function flattenObject(row, parentKey = '') {
    return Object.keys(row).forEach(key => {
      const keys = parentKey ? `${parentKey}.${key}` : `${key}`;
      if(typeof row[key] == 'object') {
        flattenObject(row[key], keys)
      } else {
        rows.push({
          keys,
          zh: row[key]
        });
      }
    })
  }


})();


