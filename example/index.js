import AwesomeExcel from "../src/awesomeExcel";

function btnClick() {
  console.log("export test start:");

  // 初始化
  const awesomeExcel = new AwesomeExcel();

  // 设置表格头
  awesomeExcel.setHeader([
    { header: "姓名", key: "name", width: 10 },
    { header: "年龄", key: "age", width: 10 },
    { header: "工作", key: "work", width: 100 },
  ]);

  // 设置表格内容
  awesomeExcel.setRows([{ name: "小明", age: "16", work: "student" },{ name1: "小李", age2: "22", work3: "student" }]);

  // 导出
  awesomeExcel.exportExcel({ filename: '工作表',align: "center", useHeaderKey: false });
}

const button = document.getElementById("file-download");
button.addEventListener("click", btnClick);
