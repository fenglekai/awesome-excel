import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const DEFAULT_SHEET_NAME = "sheet1";
class AwesomeExcel {
  constructor() {
    /**
     * @type {import('exceljs').Workbook}
     */
    this.workbook = new ExcelJS.Workbook();
    /**
     * @type {string}
     */
    this.sheetName = DEFAULT_SHEET_NAME;
    /**
     * @type {Array.<object>}
     */
    this.header = [];
    /**
     * @type {Array.<object>}
     */
    this.table = [];
  }

  /**
   *
   * @returns {import('exceljs').Workbook}
   */
  getWorkbook() {
    return this.workbook;
  }

  /**
   *
   * @param {string} name
   */
  setSheetName(name) {
    this.sheetName = name;
  }

  /**
   * 设置表格头部
   * @param {Array.<object>} header
   */
  setHeader(header) {
    this.header = header;
  }

  /**
   * 设置表格内容
   * @param {Array.<object>} table
   */
  setRows(table) {
    this.table = table;
  }

  /**
   * 判断数组元素是否为对象
   * @param {*} obj
   * @returns {boolean}
   */
  _isArrayAndElementsAreObjects(obj) {
    if (Array.isArray(obj)) {
      return obj.every(
        (item) => Object.prototype.toString.call(item) === "[object Object]"
      );
    }
    return false;
  }

  /**
   * 导出工作簿
   * @param {object} data
   * @param {string} data.filename
   * @param {string} data.align
   * @param {boolean} data.useHeaderKey
   * @returns {void}
   */
  async exportExcel(
    data = {
      filename: "workbook",
      align: "left",
      useHeaderKey: true,
    }
  ) {
    const { workbook, sheetName, header, table } = this;
    const { filename, align, useHeaderKey } = data;

    const worksheet = workbook.addWorksheet(sheetName);
    if (sheetName == DEFAULT_SHEET_NAME && filename) {
      worksheet.name = filename;
    }

    const START_ROW = header.length > 0 ? 2 : 1;

    worksheet.columns = header;
    worksheet.columns.forEach((v) => {
      v.alignment = { horizontal: align };
    });
    if (this._isArrayAndElementsAreObjects(table)) {
      for (let i = 0; i < table.length; i++) {
        const row = table[i];
        const sheetRow = worksheet.getRow(i + START_ROW);
        let j = 1;
        for (const [key, value] of Object.entries(row)) {
          try {
            if (useHeaderKey) {
              sheetRow.getCell(key).value = value;
            } else {
              sheetRow.getCell(j).value = value;
              j++;
            }
          } catch (error) {
            return console.error(
              `cell '${key}' not exist,please confirm whether the header 'key' is set correctly`
            );
          }
        }
        sheetRow.commit();
      }
    } else {
      return console.error(
        "Data type does not match, array object form should be used"
      );
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `${data?.filename}.xlsx`
    );
  }
}

export default AwesomeExcel;
