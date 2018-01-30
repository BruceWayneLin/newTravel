import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})

export class PreviewPdfComponent implements OnInit {

  pdfUrl: string = '';
  constructor(
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.getPdf(this.activatedRoute.queryParams['value']['orderNumber']).subscribe((item) => {
       this.pdfUrl = item['previewUrl'];
    });
  }

  completeFunPreview() {
    this.dataService.completeFunPreview(this.activatedRoute.queryParams['value']['orderNumber']);
  }

}
