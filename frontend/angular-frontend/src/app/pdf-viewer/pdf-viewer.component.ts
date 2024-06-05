// pdf-viewer.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  @Input() pdfSrc: string | undefined; // Input for PDF source (URL or base64 data)
}
