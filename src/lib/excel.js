import XLSX from 'xlsx';

export function convert(lineItems) {
  const worksheet = XLSX.utils.json_to_sheet(lineItems.items);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimate');

  return XLSX.writeFile(workbook, 'project.xlsx');
}
