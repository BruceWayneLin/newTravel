import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { Accordion } from 'ngx-accordion';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { SecurityContext } from '@angular/core/src/security';

declare var jquery: any;
declare var $ : any;
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
  rentalCarTemp: boolean;
  adjustNewEndDateTime: string;
  adjustNewStartDateTime: string;
  adjustTimeBoolean: boolean = false;
  insuredCarBrand: any;
  insuredCarBrandShow: Boolean = false;
  kycJson: any;
  kycAns: any = [];

  insuredList: any[];

  @ViewChild(Accordion) MyAccordion: Accordion;
  @ViewChild('changeEl') changeEl: ElementRef;

  constructor(
      public dataService: DataServiceService,
      private router: Router,
      private routerAct: ActivatedRoute
  ) {
    $('body').css({
      '-webkit-overflow-scrolling': 'auto'
    });
  }

  ngOnInit() {
    $(document).on('click', '.panel-heading', function(){
      document.querySelector('#flagInsuredPPlFlag').scrollIntoView();
    })
    this.reloadOneSec();
    if (this.GetIEVersion() > 0) {
      $('#goingCheckInfoBack').hide();
      $('#goingCheckInfoBack').addClass('hidden');
      $('#ieNeedToCenter').css({
        'left': '-23%',
        'width': '100%'
      });
    }else{
    }
  }

  toConsol(value, e, unit, item) {
    var obj = {};
    obj['optionValue'] = unit.value;
    obj['type'] = item.questionType;
    this.kycAns.forEach((objVal, index) => {
      if(objVal['type'] === item.questionType){
        this.kycAns.splice(index, 1);
        this.kycAns.push(obj);
      }
    });

    let arrayC = value.classList;
    var arryInputSel = $('label[for=' + value['htmlFor'] + ']');
    for(let i = 0; i <= arryInputSel.length; i++) {
      if(arryInputSel[i]){
        if(arryInputSel[i].classList.length === 1){
          arryInputSel[i].classList.add('noChecked');
        }
      }
    }
    if (value.classList.length === 2) {
      arrayC.remove('noChecked');
    } else {
      arrayC.add('noChecked');
    }
  }

  reloadOneSec() {
      if(this.routerAct.queryParams['value']['reload']){ // url does not have the text 'reloaded'
        this.router.navigate(['travel/gogoout/confirm'], {queryParams: {orderNumber: this.routerAct.queryParams['value']['orderNumber']}});
      }
      if(this.routerAct.queryParams['value']['orderNumber']){
        this.toLoadDateForConfirm();
      } else {
        var urlTemp = 'travel/index';
        if(this.router.url.slice(0, 8) === '/RentCar'){
          urlTemp = 'RentCar/BtoBtoC/';
        }
        this.router.navigate([urlTemp]);
      }
  }

  numberWithCommas = (x) => {
    if(!x){
      return '0';
    } else {
      let Xn = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return Xn;
    }
  }

  toLoadDateForConfirm() {
    if(this.router.url.slice(7, 15) == '/gogoout'){
      this.dataService.orderNumberForSave = this.routerAct.queryParams['value']['orderNumber'];
      this.dataService.orderNumber = this.routerAct.queryParams['value']['orderNumber'];
      this.gogoOutNeedToHideCol = true;
      console.log('321654', this.dataService.orderNumber);
      this.routeUrlGoGo = true;
      this.dataService.getGoGoConfirmInfo().do((item) => {
        let info = item['data'];
        this.applicantName = info['apLastName'] + info['apFirstName'];
        this.applicantMobile = info['apMobile'];
        this.applicantPid = info['apPid'];
        this.applicantAddr = info['apAddressFull'];
        this.applicantBth = info['apBirthday']['year'] + '-' + info['apBirthday']['month'] + '-' + info['apBirthday']['day'];
        this.applicantEmail = info['apEmail'];
        this.insuredDateStart = info['odStartDate']['year'] + '-' + info['odStartDate']['month'] + '-' + info['odStartDate']['day'] + ' ' + (info['odStartDateHour'] < '10' ? '0' + info['odStartDateHour'] + ':00' : info['odStartDateHour'] + ':00');
        this.insuredDateEnd = info['odEndDate']['year'] + '-' + info['odEndDate']['month'] + '-' + info['odEndDate']['day'] + ' ' + (info['odStartDateHour'] < '10' ? '0' + info['odEndDateHour'] + ':00' : info['odEndDateHour'] + ':00');
        this.insuredLocation = info['odLocation'];
        this.insuredPurpose = info['odPurpose'];
        this.inPackageButtonName = info['inPackageButtonName'];
        this.insuredList = info['insuredList'];
        this.text4Activity = info['text4Activity'];
        this.odPeriodDays = info['odPeriodDays'];
        if(info['kycQuestions']) {
          this.kycJson = info['kycQuestions'];
          this.kycJson.forEach(element => {
            var DefaultObj = {};
            DefaultObj['type'] = element['questionType'];
            element['options'].forEach(item => {
              if(item['isDefault']) {
                DefaultObj['optionValue'] = item['value'];
              }
            });
            this.kycAns.push(DefaultObj);
          });
          console.log(this.kycAns);
        }
        
        // this.odRate = info['odRate'];
        this.dataService.purposeImageUrl = info['purposeImageUrl'];
        
        // Observable.setTimeout(() => {
        // }, 100);
        
        document.querySelector('#flagTop').scrollIntoView();
      }).delay(200).subscribe(()=>{
        $('body').css({
          '-webkit-overflow-scrolling': 'touch'
        });
        window.scrollTo(0, 0);
        $('html, body').animate({scrollTop: '0px'}, 0);
      });
    } else {
      // rentcar and travel
      this.dataService.getConfirmInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
        const info = item;
        
        if(info['allowStayOnConfirmPage']){
          $('#TxtAreaModalContent').attr('style', 'top: 15vh !important');
          $('#timeAdjTxtArea').empty();
          if (info['text4AdjustStartTime'].length > 0) {
            const modal = document.getElementById('timeAdjTxtAreaModal');
            modal.style.display = 'block';
            var txt = info['text4AdjustStartTime'];
            // var txt = '<p>因即將超過選擇的投保時間，您的保險起始時間將調整為下個整點</p><p>2018-02-27 <span>11:00</span>起算，請點選確認後繼續。</p>';
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = txt;
            $('#timeAdjTxtArea').append(htmlObject);
            document.querySelector('#timeAdjTxtAreaModal').scrollIntoView();
          }
          this.applicantName = info['apLastName'] + info['apFirstName'];
          this.applicantMobile = info['apMobile'];
          this.applicantPid = info['apPid'];
          this.applicantAddr = info['apAddressFull'];
          this.applicantBth = info['apBirthday']['year'] + '-' + info['apBirthday']['month'] + '-' + info['apBirthday']['day'];
          this.applicantEmail = info['apEmail'];
          if(this.router.url.slice(0, 8) == '/RentCar') {
            this.adjustNewEndDateTime = info['adjustNewEndDateTime'];
            this.adjustNewStartDateTime = info['adjustNewStartDateTime'];
            this.insuredCarBrand = info['rentalCarBranch'];
            if (this.insuredCarBrand.length > 1) {
              this.insuredCarBrandShow = true;
            }
            if (this.adjustNewEndDateTime && this.adjustNewStartDateTime) {
              this.adjustTimeBoolean = true;
            }
            this.insuredDateStart = info['odStartDate']['year'] + '-' + info['odStartDate']['month'] + '-' + info['odStartDate']['day'] + ' ' + (info['odStartDateHour'] < '10' ? '0' + info['odStartDateHour'] + ':00' : info['odStartDateHour'] + ':00');
            this.insuredDateEnd = info['odEndDate']['year'] + '-' + info['odEndDate']['month'] + '-' + info['odEndDate']['day'] + ' ' + (info['odStartDateHour'] < '10' ? '0' + info['odEndDateHour'] + ':00' : info['odEndDateHour'] + ':00');
          } else {
            this.insuredDateStart = info['odStartDate']['year'] + '-' + info['odStartDate']['month'] + '-' + info['odStartDate']['day'];
            this.insuredDateEnd = info['odEndDate']['year'] + '-' + info['odEndDate']['month'] + '-' + info['odEndDate']['day'];
          }
          this.insuredLocation = info['odLocation'];
          this.insuredPurpose = info['odPurpose'];
          this.inPackageButtonName = info['inPackageButtonName'];
          this.insuredList = info['insuredList'];
          this.text4Activity = info['text4Activity'];
          this.odPeriodDays = info['odPeriodDays'];
          this.odRate = info['odRate'];
          if ( info['kycQuestions'] ) {
            this.kycJson = info['kycQuestions'];
            this.kycJson.forEach(element => {
              var DefaultObj = {};
              DefaultObj['type'] = element['questionType'];
              element['options'].forEach(item => {
                if(item['isDefault']) {
                  DefaultObj['optionValue'] = item['value'];
                }
              });
              this.kycAns.push(DefaultObj);
            });
            console.log(this.kycAns);
          }
          this.dataService.purposeImageUrl = info['purposeImageUrl'];

          document.querySelector('#flagTop').scrollIntoView();
          if(this.router.url.slice(0, 8) === '/RentCar') {
            this.rentalCarTemp = true;
          }
        }else{
          var urlTemp = 'travel/index';
          if(this.router.url.slice(0, 8) === '/RentCar'){
            urlTemp = 'RentCar/BtoBtoC/';
          }
          this.router.navigate([urlTemp]);
        }
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
    console.log(this.kycAns);
    this.dataService.confirmPaying(this.kycAns);
  }

  doSomethingOnClose() {
    this.MyAccordion.closeAll();
    document.querySelector('#flagInsuredPPlFlag').scrollIntoView();
  }

  getBakInfo(){
    console.log(this.router.url.slice(0, 8));
    this.dataService.backFromConfirm = true;
    if(this.router.url.slice(7, 15) === '/gogoout'){
      if(!this.dataService.gogoOrderNumber){
        this.dataService.gogoOrderNumber = this.dataService.orderNumberForSave;
      }
      if(!this.dataService.orderNumberForSave){
        this.dataService.gogoOrderNumber = this.dataService.orderNumber;
      }
      this.router.navigate(['travel/gogoout'], {queryParams: {orderNumber: this.dataService.gogoOrderNumber}});
    }else{
      if(this.router.url.slice(0, 8) === '/RentCar'){
        this.router.navigate(['RentCar/BtoBtoC/memberCreate'], {queryParams: {orderNumber: this.dataService.orderNumberForSave}});
      }
      if(this.router.url.slice(0, 19) === '/travel/confirmPage'){
        this.router.navigate(['travel/memberCreate'], {queryParams: {orderNumber: this.dataService.orderNumberForSave}});
      }
    }
  }

  toGoSignature() {
    this.dataService.toGoNextFromConfirm(this.routerAct.queryParams['value']['orderNumber'], this.kycAns);
  }

}
