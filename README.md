# obj_xlsx
deal with xlsx and even maybe with vsc
#Easy use 
`import {SingleSheet} from '../app/obj_xlsx'
let data = SingleSheet.parse('./task.xlsx') //get an array of Object from the file "task.xlsx"
SingleSheet.store('./result.xlsx',data,'sheet1') //save the array of Object to the file "result.xlsx"`
#SingleSheet.parse(path: string, p?: number ): Object[] ;
parse an excel file so that you can use it as an array of Object
#SingleSheet.store(path: string, data: Object[], sheetName?: string ): boolean 
save an array of Object to a excel file using sheetName as "the name of the sheet"!!
