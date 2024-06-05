/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { User } from './user.entity';

@Injectable()
export class PdfService {
  constructor() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
  }

  generatePdf(users: User[]): Buffer {
    const documentDefinition = {
      content: [
        { text: 'User List', bold: true, fontSize: 18 },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Name', 'Email', 'Phone Number', 'Address'],
              ...users.map((user) => [
                user.name,
                user.email,
                user.phoneNumber,
                user.address,
              ]),
            ],
          },
        },
      ],
    };

    const pdfDoc = pdfmake.createPdf(documentDefinition);
    const pdfBuffer = [];
    pdfDoc.on('data', (chunk) => pdfBuffer.push(chunk));
    pdfDoc.end();

    return Buffer.concat(pdfBuffer);
  }
}