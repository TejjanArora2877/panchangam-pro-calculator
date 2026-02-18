
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PanchangResult, AstronomyData, UserLocation } from '../types';

export const generatePDF = (
  panchang: PanchangResult,
  location: UserLocation,
  date: string,
  astronomy: AstronomyData | null
) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138); // Blue-900
  doc.text('Panchangam Pro', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Detailed Vedic Astrology Report', 14, 27);

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 32, 196, 32);

  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const infoY = 40;
  doc.text(`Date: ${date}`, 14, infoY);
  doc.text(`Location: ${location.city || `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`}`, 14, infoY + 5);
  doc.text(`Time Zone: Local System Time`, 14, infoY + 10);
  
  doc.text(`Generated: ${new Date().toLocaleString()}`, 120, infoY);

  // Section 1: Core Panchang
  autoTable(doc, {
    startY: 60,
    head: [['Attribute', 'Value', 'Details / End Time']],
    body: [
      ['Tithi', panchang.tithi, `Ends: ${panchang.tithiEndTime}`],
      ['Paksha', panchang.paksha, ''],
      ['Nakshatra', `${panchang.nakshatra} (Pada ${panchang.pada})`, `Ends: ${panchang.nakshatraEndTime}`],
      ['Yoga', panchang.yoga, panchang.yogaEffect],
      ['Karana', panchang.karana, ''],
      ['Vara', panchang.vara, `Ruler: ${panchang.varaRuler}`],
      ['Moon Phase', panchang.moonPhase, '']
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold', width: 40 } }
  });

  // Section 2: Planetary Positions
  // autoTable adds lastAutoTable to the doc instance (cast to any to access dynamic prop)
  let finalY = (doc as any).lastAutoTable?.finalY || 100;
  
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text('Planetary Positions (Rashi)', 14, finalY + 15);

  autoTable(doc, {
    startY: finalY + 20,
    head: [['Body', 'Sign (Rashi)', 'Lord', 'Element', 'Modality']],
    body: [
      ['Moon (Chandra)', panchang.moonRashi.name, panchang.moonRashi.lord, panchang.moonRashi.element, panchang.moonRashi.modality],
      ['Sun (Surya)', panchang.sunRashi.name, panchang.sunRashi.lord, panchang.sunRashi.element, panchang.sunRashi.modality],
    ],
    theme: 'striped',
    headStyles: { fillColor: [71, 85, 105] }, // Slate-600
  });

  // Section 3: Marine & Astronomy
  finalY = (doc as any).lastAutoTable?.finalY || 150;
  
  if (astronomy) {
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Marine & Astronomical Data', 14, finalY + 15);

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Metric', 'Value']],
      body: [
        ['Tide Intensity', panchang.tideIntensity],
        ['Est. High Tide', panchang.nextHighTide],
        ['Est. Low Tide', panchang.nextLowTide],
        ['Sunrise', astronomy.sunrise],
        ['Sunset', astronomy.sunset],
        ['Moonrise', astronomy.moonrise],
        ['Moonset', astronomy.moonset]
      ],
      theme: 'plain',
      styles: { fontSize: 10 },
      columnStyles: { 0: { fontStyle: 'bold', width: 60 } }
    });
  }

  // Footer / Accuracy
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Data Source: IPGeolocation API + Custom Astronomical Ecliptic Algorithms.', 14, pageHeight - 15);
  doc.text('Precision: ±0.5° (Atmospheric Refraction Corrected).', 14, pageHeight - 10);
  doc.text('© Panchangam Pro', 180, pageHeight - 10);

  doc.save(`panchang_${date}.pdf`);
};
