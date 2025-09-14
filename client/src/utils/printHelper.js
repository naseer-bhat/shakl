export function handlePrint(copiesArray, widthCm, heightCm, PPI) {
  const horizontalGapPx = 2;
  const verticalGapPx = 5;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
    <title>Print</title>
    <style>
      @page { margin: 0; }
      body {
        padding: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        margin: 0;
      }
      .copy {
        margin: 0 ${horizontalGapPx}px ${verticalGapPx}px 0;
      }
      img {
        width: ${Math.round((widthCm / 2.54) * PPI)}px;
        height: ${Math.round((heightCm / 2.54) * PPI)}px;
      }
    </style>
    </head>
    <body>
      ${copiesArray.map((img) => `<div class="copy"><img src="${img}" /></div>`).join("")}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
