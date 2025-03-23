
import * as XLSX from 'xlsx';

/**
 * Exports data to an Excel file and triggers download
 * @param data Array of objects to export
 * @param filename Name of the file without extension
 * @param sheetName Name of the worksheet
 */
export const exportToExcel = (
  data: Record<string, any>[],
  filename: string,
  sheetName: string = 'Sheet1'
): void => {
  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate the Excel file as a binary string
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Convert to Blob
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xlsx`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
