declare class SingleSheet {
  static parse(path: string, p?: number): Object[]
  static store(path: string, data: Object[], sheetName?: string): boolean
  static to_xlsx_buffer(data: Object[], sheetName?: string)
}
declare function toCSV(path: string, x: Object[], wd?: string): number
declare function toJSON(path: string, wd?: string): Object[]
export { SingleSheet, toCSV, toJSON }