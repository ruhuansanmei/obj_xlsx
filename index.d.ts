declare class SingleSheet {
  static parse(path: string, p?: number ): Object[] ;
  static store(path: string, data: Object[], sheetName?: string ): boolean ;
}
declare function toCSV(path: string, x: Object[], wd?: string) :number
declare function toJSON(path: string, wd?: string): Object[]
export {SingleSheet,toCSV,toJSON}