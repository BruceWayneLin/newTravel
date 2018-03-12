import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fail-payment',
  templateUrl: './fail-payment.component.html',
  styleUrls: ['./fail-payment.component.css']
})
export class FailPaymentComponent implements OnInit {
  btnUrl: string;
  btnGoBakHomeUrl: string = 'travel/';
  btnTxt: string;
  url4RetryPaymentPage: boolean = false;
  constructor(
      private dataServiceService:DataServiceService,
      private router: Router,
      private actRoute: ActivatedRoute
  ) {
   }

  wrongMsg: string = '';

  ngOnInit() {
      var Url = window.location.href;
      var idArray = this.toGetId(Url);
      var turnBakUrl = this.toGetDataFromUrl(Url);
      idArray['orderNumber'].forEach((item) => {
          this.dataServiceService.orderNumberForSave = item;
      });
      window.scrollTo(0, 0);
      $('html, body').animate({scrollTop: '0px'}, 0);
      if(this.router.url.slice(0, 8) == '/RentCar'){
        this.btnGoBakHomeUrl = 'RentCar/BtoBtoC';
      }
      this.dataServiceService.failPaymentInfo(turnBakUrl).subscribe((item)=>{
        if(item['url4RetryPaymentPage'].length > 1) {
          this.btnUrl = item['url4RetryPaymentPage'];
          this.btnTxt = '重新付款';
          this.url4RetryPaymentPage = true;
        }
        this.wrongMsg = item['msg'];
      })
  }

    toGetId(url) {
        var queryStart = url.indexOf('?') + 1;
        var queryEnd = url.length + 1;
        var query = url.slice(queryStart, queryEnd - 1);
        var pairs = query.replace(/\+/g, '').split('&');
        var parms = {};
        var i;
        var n;
        var v;
        var nv;
        if (query === url || query === '') return;
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split('=', 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    };

  toGetDataFromUrl(url) {
    var queryStart = url.indexOf('?') + 1;
    var queryEnd = url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    return query;
  };

}
