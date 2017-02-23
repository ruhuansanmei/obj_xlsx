import * as fs from 'fs'
import * as xlsx from 'node-xlsx'
import { cloneDeep } from 'lodash'
import *  as iconv from 'iconv-lite'
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
          if (d[n] != undefined) {
            tmp[x] = d[n]
          }
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
        result_titles.push(j == 'undefined' ? null : j)
      }
      const result_list = []
      result_list.push(result_titles)
      const template = []
      for (let iter = 0; iter < result_titles.length; ++iter) {
        template.push[null]
      }
      for (let m of data_list) {
        let tmp = cloneDeep(template)
        result_titles.map((x, n) => {
          if (m[x] != undefined) {
            tmp[n] = m[x]
          }
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


let toCSV = (path: string, x: Object[], wd?: string) => {
  if(fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
  x = cloneDeep(x)
  let head: string[] = [];
  let headString: string;
  x = x.length ? x : [{}];
  for (let k in x[0]) {
    head.push(k);
  }
  headString = head.join(',');
  headString += '\r\n';
  //for windows or linux
  if (wd) {
    let gData = iconv.encode(headString, wd);
    fs.appendFileSync(path, gData);
  } else {
    fs.appendFileSync(path, headString);
  }
  let writeContent = (x) => {
    let i = x.shift()
    if (!i) {
      return 0
    }
    let data: string[] = [];
    let dataString: string;
    for (let l in i) {
      if (i[l] instanceof Array) {
        let tData = i[l].join('#');
        data.push(tData);
      } else {
        data.push(i[l]);
      }
    }
    dataString = data.join(',');
    if (x.length != 0) {
      dataString += '\r\n';
    }
    if (wd) {
      let gData = iconv.encode(dataString, 'gbk');
      fs.appendFileSync(path, gData);
    } else {
      fs.appendFileSync(path, dataString);
    }
    return writeContent(x)
  }


  // for (let i of x) {
  //   let data: string[] = [];
  //   let dataString: string;
  //   for (let l in i) {
  //     if (i[l] instanceof Array) {
  //       let tData = i[l].join('#');
  //       data.push(tData);
  //     } else {
  //       data.push(i[l]);
  //     }
  //   }
  //   dataString = data.join(',');
  //   dataString += '\r\n';
  //   if (wd) {
  //     let gData = iconv.encode(dataString, 'gbk');
  //     fs.appendFileSync(path, gData);
  //   } else {
  //     fs.appendFileSync(path, dataString);
  //   }
  // }
  return writeContent(x)
}
let toJSON = (path: string, wd?: string): Object[] => {
  //for windows or linux
  let data: string;
  if (wd) {
    let binData = fs.readFileSync(path);
    data = iconv.decode(binData, wd);
  } else {
    data = fs.readFileSync(path, 'utf-8');
  }
  let dataArray: string[] = data.split('\r\n');
  let head: string = dataArray.shift();
  let headArray: string[] = head.split(',');
  let result: Object[] = dataArray.map((x): Object => {
    let obj: Object = {};
    let xArray: string[] = x.split(',');
    headArray.map((a, i) => {
      obj[a] = xArray[i];
    })
    return obj;
  });
  return result;
}

export { SingleSheet, toCSV, toJSON }