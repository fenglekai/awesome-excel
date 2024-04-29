import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const DEFAULT_SHEET_NAME = "sheet1";
class AwesomeExcel {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.sheetName = DEFAULT_SHEET_NAME;
    this.header = [];
    this.table = [];
  }

  getWorkbook() {
    return this.workbook;
  }

  setSheetName(name) {
    this.sheetName = name;
  }

  setHeader(header) {
    this.header = header;
  }

  setRows(table) {
    this.table = table;
  }

  isArrayAndElementsAreObjects(obj) {
    const isPlainObject = (obj) =>
      Object.prototype.toString.call(obj) === "[object Object]";
    if (Array.isArray(obj)) {
      return obj.every((item) => isPlainObject(item));
    }
    return false;
  }

  /**
   * 导出工作簿
   * @param {Object} data
   * @param {String} data.filename
   * @param {String} data.align
   * @returns
   */
  async exportExcel(data) {
    const { workbook, sheetName, header, table } = this;
    const { filename, align } = data;

    const worksheet = workbook.addWorksheet(sheetName);
    if (sheetName == DEFAULT_SHEET_NAME && filename) {
      worksheet.name = filename;
    }

    const ALIGN = align || "left";
    const START_ROW = header.length > 0 ? 2 : 1;

    worksheet.columns = header;

    if (this.isArrayAndElementsAreObjects(table)) {
      let rowKeys;
      if (table.length) {
        const firstRow = table[0];
        rowKeys = Object.keys(firstRow);
        for (let i = 0; i < rowKeys.length; i++) {
          const headerCol = worksheet.getColumn(i + 1);
          headerCol.alignment = { horizontal: ALIGN };
        }
      }

      for (let i = 0; i < table.length; i++) {
        const row = table[i];
        const sheetRow = worksheet.getRow(i + START_ROW);
        for (let j = 0; j < rowKeys.length; j++) {
          const key = rowKeys[j];
          sheetRow.getCell(j + 1).value = row[key];
        }
        sheetRow.commit();
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `${data?.filename}.xlsx`
    );
  }
}

export default AwesomeExcel;
