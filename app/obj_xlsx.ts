import * as fs from 'fs'
import * as xlsx from 'node-xlsx'
import { cloneDeep } from 'lodash'
class SingleSheet {
  static parse(path: string, p: number = 0): Object[] {
    try {
      let doc = xlsx.parse(path)[p]['data']
      const titles = doc.shift()
      let source = []
      const source_template = {}
      for (let t of titles) {
        source_template[t] = null;
      }
      for (let d of doc) {
        let tmp = cloneDeep(source_template)
        titles.map((x, n) => {
          if (d[n] == undefined) {
            tmp[x] == null
          }
          tmp[x] = d[n]
        })
        source.push(tmp)
      }
      return source
    } catch (e) {
      console.log(e)
      return [{ error: 'Something wrong occured!!!' }]
    }
  }
  static store(path: string, data: Object[], sheetName: string = 'result'): boolean {
    try {
      const data_list = cloneDeep(data)
      const result_titles = []
      for (let j in data_list[0]) {
        result_titles.push(j)
      }
      const result_list = []
      result_list.push(result_titles)
      const template = Array(result_titles.length)
      // for (let t of )
      for (let m of data_list) {
        let tmp = cloneDeep(template)
        result_titles.map((x, n) => {
          if (m[x] == undefined) {
            tmp[n] = null
          }
          tmp[n] = m[x]
        })
        result_list.push(tmp)
      }
      let buffer = xlsx.build([{ name: sheetName, data: result_list }])
      fs.writeFileSync(path, buffer, 'binary');
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export {SingleSheet}