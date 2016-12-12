"use strict";
var fs = require('fs');
var xlsx = require('node-xlsx');
var lodash_1 = require('lodash');
var SingleSheet = (function () {
    function SingleSheet() {
    }
    SingleSheet.parse = function (path, p) {
        if (p === void 0) { p = 0; }
        try {
            var doc = xlsx.parse(path)[p]['data'];
            var titles = doc.shift();
            var source = [];
            var source_template = {};
            for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
                var t = titles_1[_i];
                source_template[t] = null;
            }
            var _loop_1 = function(d) {
                var tmp = lodash_1.cloneDeep(source_template);
                titles.map(function (x, n) {
                    if (d[n] != undefined) {
                        tmp[x] = d[n];
                    }
                });
                source.push(tmp);
            };
            for (var _a = 0, doc_1 = doc; _a < doc_1.length; _a++) {
                var d = doc_1[_a];
                _loop_1(d);
            }
            return source;
        }
        catch (e) {
            console.log(e);
            return [{ error: 'Something wrong occured!!!' }];
        }
    };
    SingleSheet.store = function (path, data, sheetName) {
        if (sheetName === void 0) { sheetName = 'result'; }
        try {
            var data_list = lodash_1.cloneDeep(data);
            var result_titles = [];
            for (var j in data_list[0]) {
                result_titles.push(j == 'undefined' ? null : j);
            }
            var result_list = [];
            result_list.push(result_titles);
            var template = [];
            for (var iter = 0; iter < result_titles.length; ++iter) {
                template.push[null];
            }
            var _loop_2 = function(m) {
                var tmp = lodash_1.cloneDeep(template);
                result_titles.map(function (x, n) {
                    if (m[x] != undefined) {
                        tmp[n] = m[x];
                    }
                });
                result_list.push(tmp);
            };
            for (var _i = 0, data_list_1 = data_list; _i < data_list_1.length; _i++) {
                var m = data_list_1[_i];
                _loop_2(m);
            }
            var buffer = xlsx.build([{ name: sheetName, data: result_list }]);
            fs.writeFileSync(path, buffer, 'binary');
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    return SingleSheet;
}());
exports.SingleSheet = SingleSheet;
//# sourceMappingURL=obj_xlsx.js.map