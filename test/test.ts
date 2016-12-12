import {SingleSheet} from '../app/obj_xlsx'
let data = SingleSheet.parse('./task.xlsx')
SingleSheet.store('./result.xlsx',data,'sheet1')
console.log(data)