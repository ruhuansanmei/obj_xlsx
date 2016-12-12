"use strict";
var obj_xlsx_1 = require('../app/obj_xlsx');
var data = obj_xlsx_1.SingleSheet.parse('./task.xlsx');
obj_xlsx_1.SingleSheet.store('./result.xlsx', data, 'sheet1');
console.log(data);
//# sourceMappingURL=test.js.map