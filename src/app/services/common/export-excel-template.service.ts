import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelTemplateService {

  constructor() { }

  // Servcie to export template excel
  exportTemplate(field: string[], fileName: string): void {
    const data = [field];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Template': worksheet },
      SheetNames: ['Template']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(file, fileName);
  }
  
}
