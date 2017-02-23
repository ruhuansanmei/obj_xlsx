"use strict";
var obj_xlsx_1 = require("../app/obj_xlsx");
var data = obj_xlsx_1.SingleSheet.parse('./task.xlsx');
obj_xlsx_1.SingleSheet.store('./result.xlsx', data, 'sheet1');
console.log(data);
var csvData = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
obj_xlsx_1.toCSV('./csvData.csv', csvData, 'gbk');
var csvData2 = obj_xlsx_1.toJSON('./csvData.csv');
console.log(csvData2);
//# sourceMappingURL=test.js.map