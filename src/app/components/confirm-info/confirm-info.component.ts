import {Component, OnInit, ViewChild} from '@angular/core';
import {Accordion} from "ngx-accordion";
import {Router} from '@angular/router';
import { DataServiceService } from '../../services/data-service.service'
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-confirm-info',
  templateUrl: './confirm-info.component.html',
  styleUrls: ['./confirm-info.component.css']
})

export class ConfirmInfoComponent implements OnInit {
  isExpandAll: boolean = false;

  applicantName: string;
  applicantMobile: string;
  applicantPid: string;
  applicantAddr: string;
  applicantBth: string;
  applicantEmail: string;
  inPackageButtonName: string;

  insuredDateStart: string;
  insuredDateEnd: string;
  insuredLocation: string;
  insuredPurpose: string;
  routeUrlGoGo: boolean = false;

  text4Activity: string;
  odPeriodDays: number;
  odRate: number;
  gogoOutNeedToHideCol: boolean = false;

  insuredList: any[];

  @ViewChild(Accordion) MyAccordion: Accordion;

  constructor(
      public dataService:DataServiceService,
      private router:Router
  ) {
    // $('html, body').animate({scrollTop: '0px'}, 0);
  }

  ngOnInit() {
    $(document).on('click', '.panel-heading', function(){
      document.querySelector('#flagInsuredPPlFlag').scrollIntoView();

      // var body = $("html, body");
      // body.stop().animate({scrollTop: 290}, 200, 'swing', function () {
      // });
    })

    if (this.GetIEVersion() > 0) {
      $('#goingCheckInfoBack').hide();
      $('#goingCheckInfoBack').addClass('hidden');
      $('#ieNeedToCenter').css({
        'left': '-23%',
        'width': '100%'
      });
    }else{
    }

    if(this.router.url.slice(0, 8) == '/gogoout'){ 
      this.gogoOutNeedToHideCol = true;
      console.log(this.dataService.orderNumber);
      this.routeUrlGoGo = true;
      this.dataService.getGoGoConfirmInfo().subscribe((item) => {
        let info = item['data'];
        this.applicantName = info['apLastName'] + info['apFirstName'];
        this.applicantMobile = info['apMobile'];
        this.applicantPid = info['apPid'];
        this.applicantAddr = info['apAddressFull'];
        this.applicantBth = info['apBirthday']['year'] + '-' + info['apBirthday']['month'] + '-' + info['apBirthday']['day'];
        this.applicantEmail = info['apEmail'];
        this.insuredDateStart = info['odStartDate']['year'] + '-' + info['odStartDate']['month'] + '-' + info['odStartDate']['day'];
        this.insuredDateEnd = info['odEndDate']['year'] + '-' + info['odEndDate']['month'] + '-' + info['odEndDate']['day'];
        this.insuredLocation = info['odLocation'];
        this.insuredPurpose = info['odPurpose'];
        this.inPackageButtonName = info['inPackageButtonName'];
        this.insuredList = info['insuredList'];
        this.text4Activity = info['text4Activity'];
        this.odPeriodDays = info['odPeriodDays'];
        // this.odRate = info['odRate'];
        this.dataService.purposeImageUrl = info['purposeImageUrl'];
        document.querySelector('#flagTop').scrollIntoView();

      });
    }else{
      this.dataService.getConfirmInfo().subscribe((item) => {
        let info = item;
        this.applicantName = info['apLastName'] + info['apFirstName'];
        this.applicantMobile = info['apMobile'];
        this.applicantPid = info['apPid'];
        this.applicantAddr = info['apAddressFull'];
        this.applicantBth = info['apBirthday']['year'] + '-' + info['apBirthday']['month'] + '-' + info['apBirthday']['day'];
        this.applicantEmail = info['apEmail'];
        this.insuredDateStart = info['odStartDate']['year'] + '-' + info['odStartDate']['month'] + '-' + info['odStartDate']['day'];
        this.insuredDateEnd = info['odEndDate']['year'] + '-' + info['odEndDate']['month'] + '-' + info['odEndDate']['day'];
        this.insuredLocation = info['odLocation'];
        this.insuredPurpose = info['odPurpose'];
        this.inPackageButtonName = info['inPackageButtonName'];
        this.insuredList = info['insuredList'];
        this.text4Activity = info['text4Activity'];
        this.odPeriodDays = info['odPeriodDays'];
        this.odRate = info['odRate'];
        this.dataService.purposeImageUrl = info['purposeImageUrl'];
        document.querySelector('#flagTop').scrollIntoView();
      });
    }
    
  }

  GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
      return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
      return 11;

    else
      return 0; //It is not IE
  }

  toTriggerCloseA(){
    $(this).closet('a').trigger('click');
  }

  animateStart(value){
    document.querySelector('#flagInsuredPPlFlag').scrollIntoView();
    console.log(value);
    // $(document).on('click', '#clickAccordion', function(){
    //
    //   //
    //   // var body = $("html, body");
    //   // body.stop().animate({scrollTop: 290}, 200, 'swing', function () {
    //   // });
    // })
  }

  confirmPaying(){
    this.dataService.confirmPaying();
  }

  doSomethingOnClose() {
    this.MyAccordion.closeAll();
    document.querySelector('#flagInsuredPPlFlag').scrollIntoView();
  }

  getBakInfo(){
    this.dataService.backFromConfirm = true;
    if(this.router.url.slice(0, 8) == '/gogoout'){
      this.router.navigate(['/gogoout'], {queryParams: {orderNumber: this.dataService.gogoOrderNumber}});
    }else{
      this.router.navigate(['/memberCreate'], {queryParams: {orderNumber: this.dataService.orderNumberForSave}});
    }
  }

  toGoSignature() {
    this.dataService.toGoNextFromConfirm();
  }

}
