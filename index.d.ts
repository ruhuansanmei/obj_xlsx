declare class SingleSheet {
  static parse(path: string, p?: number ): Object[] ;
  static store(path: string, data: Object[], sheetName?: string ): boolean ;
}
export {SingleSheet}