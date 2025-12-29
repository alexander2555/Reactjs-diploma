import { jsPDF } from 'jspdf'

export const stagePDFExport = (stage, docName, docSize) => {
  // TODO - экспорт толькообласти холста по docSize
  console.table(docSize)
  const { width, height } = stage.getSize()

  const pdf = new jsPDF('l', 'px', [width, height])

  pdf.addImage(stage.toDataURL({ pixelRatio: 2 }), 0, 0, width, height)

  pdf.save(`${docName}.pdf`)
}
