import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})

export class PreviewPdfComponent implements OnInit {

  pdfUrl: string = '';
  constructor(
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    $('html, body').animate({scrollTop: '0px'}, 0);
    if(this.activatedRoute.queryParams['value']['orderNumber']){
    }else{
      this.router.navigate(['travel']);
    }
  }

  ngOnInit() {
    this.dataService.getPdf(this.activatedRoute.queryParams['value']['orderNumber']).subscribe((item) => {
       this.pdfUrl = item['previewUrl'];
    });
  }

  completeFunPreview() {
    this.dataService.completeFunPreview(this.activatedRoute.queryParams['value']['orderNumber']);
  }

}
