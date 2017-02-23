import { SingleSheet, toJSON, toCSV } from '../app/obj_xlsx'
let data = SingleSheet.parse('./task.xlsx')
SingleSheet.store('./result.xlsx', data, 'sheet1')
console.log(data)

let csvData = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
toCSV('./csvData.csv',csvData,'gbk')
let csvData2 = toJSON('./csvData.csv')
console.log(csvData2)