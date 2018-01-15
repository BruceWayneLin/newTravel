import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {

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
