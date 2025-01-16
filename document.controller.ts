// import { Controller, Param, Post, UseGuards , Request, Body, Put, Get, Query, UseFilters, UseInterceptors, UploadedFile, Res, Response, NotFoundException } from "@nestjs/common";
// import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
// import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
// import { ValidateTokenGuard } from "src/auth/validate-token.guard";
// import { BaseMemberRole } from "src/base/base-member-role.enum";
// import { BaseRoles } from "src/base/roles.decorator";
// import { BaseRolesGuard } from "src/base/roles.guard";
// import { DocumentService } from "./document.service";
// import { CreateDocument } from "./dto/create.dto";
// import { UpdateDocumentDto } from "./dto/update.dto";
// import { ListDocumentDto } from "./dto/list.dto";
// import { DocStatus, DocFlag, Document } from "./document.entity";
// import { ApiFile } from "src/api-file.decorator";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { HttpExceptionFilter } from "src/http-exception.filter";
// import { deleteFile, documentCoverImagePath, documentIconImagePath, uploadLocal } from "src/upload.constant";
// import * as path from "path";
// import * as puppeteer from 'puppeteer';
// import * as fs from 'fs';

// @ApiBearerAuth()
// @ApiTags('Document')
// // @UseGuards(JwtAuthGuard, ValidateTokenGuard)
// @Controller('v1')
// export class DocumentController {
//     constructor(private readonly documentService: DocumentService){}

// @Get(`/:baseID/:docID/document.downloadPdf`)
// @ApiParam({ name: 'baseID' })
// @ApiParam({ name: 'docID' })
// // @BaseRoles(BaseMemberRole.ADMIN , BaseMemberRole.MEMBER , BaseMemberRole.MANAGER) 
// // @UseGuards(BaseRolesGuard)
// @ApiOperation({ summary: 'Download PDF of wiki element' })
// async elementPDF(
//   @Request() req: any,
//   @Response() res: any,
//   @Param('docID') docID: string,
//   @Param('baseID') baseID: number,
// ) {
//   // Fetch document details
//   console.log(baseID , docID)
//   const doc = await Document.findOne({ where: { id: docID, base_id: baseID } });
//   if (!doc) {
//     throw new NotFoundException({
//       status: 404,
//       message: 'Page not found ...',
//     });
//   }

//   if (!doc.doc_html) {
//     throw new NotFoundException({
//       status: 404,
//       message: 'Page HTML not found',
//     });
//   }

//   try {
//     // Launch Puppeteer
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
// const html =  `<!DOCTYPE html>
// <html>

// <head>
//    <meta charset="UTF-8" />
//    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
// </head>

// <body>
// ${doc.doc_html}
// </body>

// </html>`
//     // Set HTML content
//     await page.setContent(html, { waitUntil: 'domcontentloaded' });

//     // Wait for images to load
//     await page.evaluate(() => {
//       return Promise.all(
//         Array.from(document.images).map((img) => {
//           if (img.complete) return Promise.resolve();
//           return new Promise((resolve, reject) => {
//             img.onload = resolve;
//             img.onerror = reject;
//           });
//         }),
//       );
//     });

//     // Set CSS if available
//     const cssFilePath =  path.join(process.cwd() , 'doc.css')  
//     console.log(cssFilePath) // working
//     if (fs.existsSync(cssFilePath)) {
//       const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
//       await page.addStyleTag({ content: cssContent });
//     }
    
//     // Define header and footer templates
//     const headerTemplate = `
//       <div style=" -webkit-print-color-adjust: exact;width: 100%; padding: -15px; margin-top: -20px; background-color: #FFF9C4 !important; display: flex; justify-content: space-between; font-size: 10px;">
//         <h2>Header</h2>
//       </div>
//     `;

//     const footerTemplate = `
//       <div style=" -webkit-print-color-adjust: exact;width: 100%; padding: -15px; margin-top: -20px; background-color: #FFF9C4 !important; display: flex; justify-content: space-between; font-size: 10px;">
//         <h2>Footer</h2>
//       </div>
//     `;

//     // Generate PDF
//     const pdf = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       displayHeaderFooter: true,
//       headerTemplate,
//       footerTemplate,
//       margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     });

//     await browser.close();

//     // Send PDF response
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Length': pdf.length,
//       'Content-Disposition': `attachment; filename= ${doc.doc_name}_${docID}.pdf`,
//     });
//     console.log("---------------------------------------------------------------")
//     console.log(pdf) // geting data as buffer in console
//     console.log("---------------------------------------------------------------")

//     res.send(pdf);
//   } catch (error) {
//     console.log(error)
//     throw new NotFoundException({
//       status: 500,
//       message: 'PDF generation failed',
//       error: error.message,
//     });
//   }
// }

// }       