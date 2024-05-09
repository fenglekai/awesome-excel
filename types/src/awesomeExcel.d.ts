export default AwesomeExcel;
declare class AwesomeExcel {
    /**
     * @type {import('exceljs').Workbook}
     */
    workbook: import('exceljs').Workbook;
    /**
     * @type {string}
     */
    sheetName: string;
    /**
     * @type {Array.<object>}
     */
    header: Array<object>;
    /**
     * @type {Array.<object>}
     */
    table: Array<object>;
    /**
     *
     * @returns {import('exceljs').Workbook}
     */
    getWorkbook(): import('exceljs').Workbook;
    /**
     *
     * @param {string} name
     */
    setSheetName(name: string): void;
    /**
     * 设置表格头部
     * @param {Array.<object>} header
     */
    setHeader(header: Array<object>): void;
    /**
     * 设置表格内容
     * @param {Array.<object>} table
     */
    setRows(table: Array<object>): void;
    /**
     * 判断数组元素是否为对象
     * @param {*} obj
     * @returns {boolean}
     */
    _isArrayAndElementsAreObjects(obj: any): boolean;
    /**
     * 导出工作簿
     * @param {object} data
     * @param {string} data.filename
     * @param {string} data.align
     * @param {boolean} data.useHeaderKey
     * @returns {void}
     */
    exportExcel(data?: {
        filename: string;
        align: string;
        useHeaderKey: boolean;
    }): void;
}
