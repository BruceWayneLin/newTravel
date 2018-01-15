import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signature-go-goout',
  templateUrl: './signature-go-goout.component.html',
  styleUrls: ['./signature-go-goout.component.css']
})
export class SignatureGoGooutComponent implements OnInit {

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getSignatureData().subscribe((item)=>{
      console.log('1234', item);
    });
  }

  toGoPreviewPage(){
    this.router.navigate(['gogoout/previewPdf']);
  }

}
