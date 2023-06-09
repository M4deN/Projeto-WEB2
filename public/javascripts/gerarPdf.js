const { createCanvas } = require('canvas');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Livro = require("../../models/livro");

async function gerarRelatorio() {
    const countByYear = await Livro.aggregate([
      {
        $group: {
          _id: "$anoPublicacao",
          count: { $sum: 1 }
        }
      }
    ]);
  
    const labels = countByYear.map(yearData => yearData._id);
    const data = countByYear.map(yearData => yearData.count);
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';  
    const barWidth = canvas.width / data.length;
    const maxBarHeight = canvas.height - 100;
    const maxCount = Math.max(...data);
    
    for (let i = 0; i < data.length; i++) {
      const barHeight = (data[i] / maxCount) * maxBarHeight;
      const x = i * barWidth + 50;
      const y = canvas.height - barHeight - 50;
  
      ctx.fillRect(x, y, barWidth - 10, barHeight);
  
      ctx.font = '20px Arial';
      ctx.fillText(data[i].toString(), x, y - 10);
  
      ctx.font = '16px Arial';
      ctx.fillText(labels[i].toString(), x, canvas.height - 30);
    }
  
    const imagePath = path.join(__dirname, "../reports/chart.png");
    const stream = fs.createWriteStream(imagePath);
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
      canvas.createPNGStream().pipe(stream);
    });
  
    const pdfPath = path.join(__dirname, "../reports/chart.png");
    const pdfDoc = new PDFDocument();  
    const writeStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(writeStream);  
    pdfDoc.font('Helvetica-Bold').fontSize(20).fillColor('black').text('TOTAL DE LIVROS POR ANO', 10, 10);
    pdfDoc.image(imagePath, 50, 100, { width: 500 });  
    pdfDoc.end();
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  
    return pdfPath;
  }

  module.exports = gerarRelatorio;