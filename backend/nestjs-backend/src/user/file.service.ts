/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private readonly filePath = path.join(__dirname, '..', 'users.pdf');

  savePdfFile(pdfBuffer: Buffer): void {
    fs.writeFileSync(this.filePath, pdfBuffer);
  }

  getPdfFile(): Buffer {
    return fs.readFileSync(this.filePath);
  }
}