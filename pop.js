// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {

//   // Get type of source from process.argv, default to url
//   var type = process.argv.slice(2)[0] || 'url';

//   // Create a browser instance
//   const browser = await puppeteer.launch();

//   // Create a new page
//   const page = await browser.newPage();



//     const html = fs.readFileSync('sample.html', 'utf-8');
//     await page.setContent(html, { waitUntil: 'domcontentloaded' });

//   await page.emulateMediaType('screen');

//   // Downlaod the PDF
//   const pdf = await page.pdf({
//     path: `result_11${type}.pdf`,
//     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     printBackground: true,
//     format: 'A4',
//   });

//   // Close the browser instance
//   await browser.close();
  
// })();

/////////////////////
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {
//   // Get type of source from process.argv, default to url
//   var type = process.argv.slice(2)[0] || 'url';

//   // Create a browser instance
//   const browser = await puppeteer.launch();

//   // Create a new page
//   const page = await browser.newPage();

//   // Load the HTML content
//   const html = fs.readFileSync('sample.html', 'utf-8');
//   await page.setContent(html, { waitUntil: 'domcontentloaded' });

//   // Wait for images to load
//   await page.evaluate(() => {
//     return Promise.all(
//       Array.from(document.images).map((img) => {
//         if (img.complete) {
//           return Promise.resolve();
//         }
//         return new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });
//       })
//     );
//   });

//   await page.emulateMediaType('screen');

//   // Define header and footer templates
//   const headerTemplate = `
//   <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 10px; padding: 0 10px;">
//     <div style="text-align: left;">
//       <div style="font-weight: bold;">Company Name</div>
//       <div>1234 Main Street</div>
//       <div>City, State, ZIP</div>
//       <div>Email: info@company.com</div>
//     </div>
//     <div style="text-align: right;">
//       <img src="https://pub-d78e6f485da34d3b9d6618927284f469.r2.dev/uploads/userProfile/5b5a4721-1da6-4725-a8aa-7e7750d43cb9.jpeg" alt="Logo" style="height: 200px;">
//     </div>
//   </div>`;

//   const footerTemplate = `
//     <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 auto;">
//       <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
//     </div>`;

//   // Download the PDF with header and footer
//   const pdf = await page.pdf({
//     path: `result_21${type}.pdf`,
//     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     printBackground: true,
//     format: 'A4',
//     displayHeaderFooter: true,
//     headerTemplate,
//     footerTemplate,
//   });

//   // Close the browser instance
//   await browser.close();
// })();


const puppeteer = require('puppeteer');
const fs = require('fs');

// Replace with your actual Base64 string


(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Load the HTML content
  const html = fs.readFileSync('sample.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // Wait for images to load
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  });

  await page.emulateMediaType('screen');

  // Define header and footer templates
  const headerTemplate = `
  <div style=" -webkit-print-color-adjust: exact;width: 100%; padding: -15px; margin-top: -20px; background-color: #FFF9C4 !important; display: flex; justify-content: space-between; font-size: 10px;">
   <h2>Header</h2>
  </div>
`;

const footerTemplate = `
   <div style=" -webkit-print-color-adjust: exact;width: 100%; padding: -15px; margin-top: -20px; background-color: #FFF9C4 !important; display: flex; justify-content: space-between; font-size: 10px;">
   <h2>Footer</h2>
  </div>
`;
  
  // `
  //   <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 auto;">
  //     <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  //   </div>`;

  // Download the PDF with header and footer
  const pdf = await page.pdf({
    path: `result_40.pdf`,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
  });

  // Close the browser instance
  await browser.close();
})();

