const fs = require("fs");
 const sharp = require("sharp");
async function main() {
  let counter = 1;

  // Dynamically import pdf-to-img as it's an ES Module
  const {  pdf } = await import("pdf-to-img");

  const document = await pdf("2.pdf", { scale: 5 });
  for await (const image of document) {
    const resizeImage = async (buffer) => {
        const image = sharp(buffer);
        const metadata = await image.metadata();
  
        if (metadata.width > 1000 ) {
            const resizeOptions = 
                { width: 800 }
               
  
            return image.resize(resizeOptions).toBuffer();
        }
  
        return buffer;
    };
    await fs.promises.writeFile(`page${counter}.png`, await resizeImage(image));
    counter++;
  }

  // You can also read a specific page number:
  const page12buffer = await document.getPage(12);
}

main();

/*
*****
SINGLE IMAGE FOR MULTIPLE PAGE PDF
*/ 

// const fs = require("fs");
// const sharp = require("sharp");

// async function main() {
//   let counter = 1;

//   // Dynamically import pdf-to-img as it's an ES Module
//   const { pdf } = await import("pdf-to-img");

//   const document = await pdf("2.pdf", { scale: 3 });
//   const images = [];

//   // Process each page of the PDF
//   for await (const image of document) {
//     const imagePath = `page${counter}.png`;
//     await fs.promises.writeFile(imagePath, image);
//     images.push(imagePath);
//     counter++;
//   }

//   // Read the metadata of the first page to determine width and height
//   const firstPageMetadata = await sharp(images[0]).metadata();
//   const pageWidth = firstPageMetadata.width;
//   const pageHeight = firstPageMetadata.height;

//   // Create a blank canvas tall enough to hold all the pages
//   const totalHeight = pageHeight * images.length;
//   const compositeCanvas = sharp({
//     create: {
//       width: pageWidth,
//       height: totalHeight,
//       channels: 3,
//       background: { r: 255, g: 255, b: 255 }, // White background
//     },
//   });

//   // Composite images one by one, adjusting the `top` offset for each
//   const compositeOperations = [];
//   let yOffset = 0;
//   for (const imagePath of images) {
//     compositeOperations.push({ input: imagePath, top: yOffset, left: 0 });
//     yOffset += pageHeight;
//   }

//   // Combine all images into a single file
//   const finalImagePath = "combined-image.png";
//   await compositeCanvas.composite(compositeOperations).toFile(finalImagePath);

//   console.log(`Combined image saved as ${finalImagePath}`);

//   // Clean up intermediate files
//   for (const imagePath of images) {
//     await fs.promises.unlink(imagePath);
//   }
// }

// main().catch(console.error);