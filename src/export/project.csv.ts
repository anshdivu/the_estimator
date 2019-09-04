import * as Papa from "papaparse";
import Project from "../project/project";

export function downloadProjectAsCsv(project: Project) {
  const csv = Papa.unparse(project.items);
  return downloadFile(`${project.name}.csv`, csv, "text/csv");
}

export function downloadFile(fileName: string, data: string, type: string) {
  const anchor = document.createElement("a");
  anchor.href = toUrl(data, type);

  anchor.setAttribute("download", fileName);
  anchor.setAttribute("target", "_blank");

  anchor.click();
  return false;
}

function toUrl(data: string, type: string) {
  const blob = new Blob([data], { type });
  return URL.createObjectURL(blob);
}
