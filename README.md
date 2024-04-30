# awesome-excel
js简单导出excel，基于[exceljs](https://github.com/exceljs/exceljs)

## 安装

```
npm install awesome-excel
```

## 使用

```
import AwesomeExcel from 'awesome-excel';

// 初始化
const awesomeExcel = new AwesomeExcel();

// 设置表格头
awesomeExcel.setHeader([
{ header: "姓名", key: "name", width: 10 },
{ header: "年龄", key: "age", width: 10 },
{ header: "工作", key: "work", width: 100 },
]);

// 设置表格内容
awesomeExcel.setRows([{ name: "小明", age: "16", work: "student" },{ name: "小李", age: "22", work: "student" }]);

// 导出
awesomeExcel.exportExcel({ filename: '工作表',align: "center" });
```

好了，你已经完全学会这个工具，快去使用吧！

## 选项

### getWorkbook

获取工作簿

- 返回值

  `ExcelJS.Workbook`

### setSheetName

  设置工作表名称

- 参数

  | 名称 | 说明       | 类型     | 默认值     |
  | ---- | ---------- | -------- | ---------- |
  | name | 工作表名称 | `String` | `'sheet1'` |

- 返回值

  `void`

### setHeader

  设置表格头部

- 参数

  | 名称   | 说明     | 类型                     | 默认值 |
  | ------ | -------- | ------------------------ | ------ |
  | header | 表头数据 | `Array<Partial<Column>>` | `[]`   |

- 返回值

  `void`

### setRows

  设置表格内容

- 参数

  | 名称  | 说明     | 类型                | 默认值 |
  | ----- | -------- | ------------------- | ------ |
  | table | 表格数据 | `Array<ObjectType>` | `[]`   |

- 返回值

  `void`

### exportExcel

  导出表格文件

- 参数

  | 名称          | 说明             | 类型     | 可选项                                                       | 默认值      |
  | ------------- | ---------------- | -------- | ------------------------------------------------------------ | ----------- |
  | data          | 设置导出参数     | `Object` |                                                              | `undefined` |
  | data.filename | 文件名称         | `String` |                                                              |             |
  | data.align    | 设置表格内容对其 | `String` | `'left'`  `'center'`  `'right'`  `'fill'`   `'justify'`  `'centerContinuous'`   `'distributed'` |             |

- 返回值

  `void`
