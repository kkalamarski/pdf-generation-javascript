import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateBtn = document.querySelector<HTMLButtonElement>("#generatePdf");
const pdfDocument = document.querySelector<HTMLDivElement>("#pdfDoc");

const onButtonClick = async () => {
  const canvas = await html2canvas(pdfDocument);
  const dataURL = canvas.toDataURL("image/png", 100);

  const pdf = new jsPDF();
  const ratio = canvas.height / canvas.width;
  const contentWidth = pdf.internal.pageSize.getWidth(); // make content full-width
  const contentHeight = contentWidth * ratio; // scale height proportionally to width

  pdf.addImage(dataURL, "png", 0, 0, contentWidth, contentHeight);

  pdf.save("generated-pdf.pdf");
};

generateBtn.addEventListener("click", onButtonClick);
