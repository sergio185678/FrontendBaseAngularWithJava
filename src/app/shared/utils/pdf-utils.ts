import { jsPDF } from 'jspdf';

export function centrar(texto: string, doc: jsPDF): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(texto);
  const xPos = (pageWidth - textWidth) / 2;
  return xPos;
}

export function drawUnderline(doc: jsPDF, texto: string, yPos: number, fontSize: number): void {
  const lineWidth = doc.getStringUnitWidth(texto) * fontSize / doc.internal.scaleFactor;
  const xPos = centrar(texto, doc);
  doc.setLineWidth(0.5);
  doc.line(xPos, yPos + 2, xPos + lineWidth, yPos + 2);
}

export function hora_actual():string{
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  return formattedDate;
}