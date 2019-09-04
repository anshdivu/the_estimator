import XLSX from "xlsx";
import Project from "../project/project";

export function downloadProjectAsExcel(project: Project) {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(project.items);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Estimate");

  return XLSX.writeFile(workbook, "project.xlsx");
}
