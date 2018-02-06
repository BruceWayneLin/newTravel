import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: 'thanks.component.html',
  styleUrls: ['thanks.component.css']
})
export class ThanksComponent implements OnInit {
  public purposeImgUrl: string;
  public couponList: any[];
  constructor(
      public dataService: DataServiceService,
      private routerAct: ActivatedRoute,
      private router: Router
  ) { 
    $('html, body').animate({scrollTop: '0px'}, 0);
  }

  ngOnInit() {
    var Url = window.location.href;
    var idArray = this.toGetId(Url);
    var turnBakUrl = this.toGetDataFromUrl(Url);
    idArray['orderNumber'].forEach((item) => {
      this.dataService.orderNumberForSave = item;
    });
    if(this.routerAct.queryParams['value']['orderNumber']){
    }else{
      this.router.navigate(['travel']);
    }

    this.dataService.getActImgUrl(turnBakUrl).subscribe((item) => {

        let replyObj = JSON.parse(item);
        if(replyObj.isEx){
          var msgs = replyObj.msgs;
          for (let i = 0; i < msgs.length; i++) {
            alert(msgs[i]);
          }
        }else{
          this.purposeImgUrl = replyObj['purposeImageUrl'];
          this.couponList = replyObj['couponList'];
        }
    });
  }

  toGetDataFromUrl(url) {
    var queryStart = url.indexOf('?') + 1;
    var queryEnd = url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    return query;
  };

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

}
