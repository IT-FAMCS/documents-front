import jsPDF from 'jspdf';
import { Report } from '../../interfaces/DocumentInterfaces';
import '../../fonts/Times New Roman Cyr Regular-normal';

export const generateReportPDF = (report: Report) => {
  const doc = new jsPDF();

  doc.addFont('Times New Roman Cyr Regular-normal.ttf', 'Times New Roman Cyr Regular', 'normal');

  doc.setFont('Times New Roman Cyr Regular', 'normal');

  let pageWidth = doc.internal.pageSize.getWidth();
  doc.setFontSize(12);

  // шапка документа
  let facultyTitle = 'Факультет прикладной математики и информатики';
  let reportTitle = 'ДОКЛАДНАЯ ЗАПИСКА';
  let reportDate = '24.03.2023 г. № _________';
  let location = 'г. Минск';
  let recipientTitle = 'Начальнику службы охраны и безопасности';
  let recipientName = 'Довыдёнку А.О.';

  // Заголовок факультета
  doc.text(facultyTitle, 20, 20, { maxWidth: pageWidth / 2 - 40 });

  doc.text(reportTitle, 20, 35);
  doc.text(reportDate, 20, 45);
  doc.text(location, 20, 55);

  let recipientTitleWidth = doc.getTextWidth(recipientTitle);
  doc.text(recipientTitle, pageWidth - recipientTitleWidth - 20, 20);
  let recipientNameWidth = doc.getTextWidth(recipientName);
  doc.text(recipientName, pageWidth - recipientNameWidth - 20, 25);

  const margin = 10;
  const maxWidth = pageWidth - margin * 2;

  doc.setFontSize(12);
  const text =
    report.firstPrefix +
    ' ' +
    report.event +
    ',' +
    ' ' +
    report.eventOrg +
    ' ' +
    report.secondPrefix +
    ' ' +
    report.action +
    '\n';

  doc.text(text, 20, 70, { maxWidth: maxWidth });

  report.auds.forEach((aud, index) => {
    let daysText = '';
    if (!aud.allWeek) {
      daysText += ' по ';
      aud.days.map((day) => (daysText += ' ' + day + ','));
      daysText = daysText.substring(0, daysText.length - 1);
    }
    let timeText = 'c ' + aud.timeFrom?.format('HH:mm') + ' по ' + aud.timeTo?.format('HH:mm');

    doc.text(`-. Аудиторию ${aud.number} ${daysText} ${timeText} `, 30, 85 + index * 10);
  });

  doc.text(`${report.sender}`, 20, 100);
  doc.text('Е.О.Шевцов', 20, 105);

  doc.text('Согласовано:', pageWidth - 50, 100);
  doc.text('Декан ФПМИ БГУ', pageWidth - 50, 105);
  doc.text('Ю.Л.Орлович', pageWidth - 50, 110);

  doc.save('докладная.pdf');
  const pdfDataUri = doc.output('datauristring');
  const newTab = window.open();
  newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
};
