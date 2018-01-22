import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';


@Component({
  selector: 'app-gogoout-cancel',
  templateUrl: './gogoout-cancel.component.html',
  styleUrls: ['./gogoout-cancel.component.css']
})
export class GogooutCancelComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataServiceService

  ) { }

  text:string = '';

  ngOnInit() {

    this.text = this.actRoute.queryParams['value']['msg'];
    this.dataService.getGoGoInitCancel(this.actRoute.queryParams['value']['orderNumber']).subscribe((item)=>{
       this.text = item['gogooutOrderNumber'];
    });
  }

  goBack() {
    this.dataService.gogoCancelBak(this.actRoute.queryParams['value']['orderNumber']);
  }

}
