import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-gogoout-cancel',
  templateUrl: './gogoout-cancel.component.html',
  styleUrls: ['./gogoout-cancel.component.css']
})
export class GogooutCancelComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private router: Router

  ) { 
    window.scrollTo(0, 0);
    $('html, body').animate({scrollTop: '0px'}, 0);
  }

  text:string = '';

  ngOnInit() {

    this.text = this.actRoute.queryParams['value']['msg'];
    if(this.actRoute.queryParams['value']['orderNumber']){
    }else{
      this.router.navigate(['/']);
    }
    this.dataService.getGoGoInitCancel(this.actRoute.queryParams['value']['orderNumber']).subscribe((item)=>{
       this.text = item['carelineOrderNumber'];
    });
  }

  goBack() {
    this.dataService.gogoCancelBak(this.actRoute.queryParams['value']['orderNumber']);
  }

}
