import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public exportPDF(cols: any[], rows: any[], exportName: string): void {
    const doc = new jsPDF('l', 'pt', 'letter');
    autoTable(doc, {
      body: rows,
      columns: cols,
    });

    doc.save(exportName);
  }

}
