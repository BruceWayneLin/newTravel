import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewChildren, AfterViewChecked}  from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { DataServiceService } from '../../services/data-service.service';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  selectedCountyName: string;
  selectedCountriesForWritten = '';
  countries: Array<any> = [];
  getDayFromBkend: number;
  selectedCountriesId: any = 1;
  selectedCountry: any = '';
  selectedCountryStr: string = '';
  selectedCountries: any = this.countries[0];
  countriesOfCounties: Array<any> = [];
  transportation: string = '飛機';
  defaultCustomerPkg: any;
  purposeList: Array<any> = [];
  selectedPackage: {};
  selectedPackageName: string = '';
  firstMon: any;
  data: any;
  packageList: Array<any> = [];
  disabledDays: string[];
  doneSelPurpose: boolean = false;
  textOfOverDays: any;
  startTravelDay: string;
  endTravelDay: string;
  selectTravelDayIsDone: boolean = false;
  travelPeriodLimit: number;
  cusPackageList: any;
  CusDetailContent: boolean = false;
  toShowMoreDays: boolean = false;
  pkgCustomGo: boolean = false;
  pkgPrimary: any;
  secondaryItems: any;
  pkgCustomTxt: string = '挑不到想要的?點我自己選';
  selPkgH2: string = '選擇方案';
  longDesc: Array<any> = [];
  pkgDetailLongArr: Array<any> = [];
  selectedCustomePkg: any;
  cusSecondItemNa: Array<any> = [];
  cusPrimaryItem: any;
  customBtn: Array<any> = [];
  customBtnAmt: Array<any> = [];
  paddingBottonZero: boolean = false;
  logoImgSrc: string = '';
  featureDesc: string = '';
  tableShowHidden: boolean = false;
  startDayLimit:number = 0;
  diffDays:number = 0;
  amountLongList: Array<any> = [];
  purposeGo: any = '觀光';
  isDoneSelectedPlaces: boolean = false;
  finalPrice: any = 0;
  cusItemJson: Array<any> = [];
  textOfSelectingDays: string = '請點選旅程出發日與返回日';
  showPkgDestail: boolean = false;
  amtBtnClickToShow: boolean = true;
  time: number = 0;
  disabledReason: Array<any> = [];
  favCountry: Array<any> = [];
  startTravelDayOn: boolean = false;
  tableList: any;
  modifiedClicked: boolean = false;
  ifTheStartIsPlusOneMoreDay: any;
  testDay:any = new Date();
  resetBackCountry: any;
  trackNum: string;
  theDayBeginingNeedToRun: number;
  pakNum: any = '';
  product: any = {};
  numberOfgetDayFromBkendLastSun: number = 0;
  clickAddedTotalNum: number = 0;
  systemDate: string;

  @ViewChild('eleTest')  el:ElementRef;
  @ViewChild('noNeedArea') nNA:ElementRef;
  @ViewChild('arrowUp') arrowUp:ElementRef;
  @ViewChild('getUpClz') getUpClz:ElementRef;
  @ViewChild('aGotClick') aGotClick:ElementRef;
  @ViewChild('selectedItem') selectedItem:ElementRef;
  @ViewChild('thisSelect') thisSelect:ElementRef;

  constructor(
    private dataService:DataServiceService
  ){
    $('body,html').animate({scrollTop: '0px'}, 0);
    var envi = '';
    if(envi == 'local'){
    }else{
      console.log = function(){};
      console.dir = function(){};
      console.info = function(){};
      console.debug = function(){};
      console.warn = function(){};
    }
  }

  images: Array<any> = [];

  toGetDataFromUrl(url) {
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

  ngOnInit() {
    this.toCompatibilityUse();
    this.CusDetailContent = true;
    this.product['product'] = 'Travel';

    var Url = window.location.href;
    var turnBakUrl = this.toGetDataFromUrl(Url);
    if(turnBakUrl){
      if(turnBakUrl['__track']){
        this.trackNum = turnBakUrl['__track'][0];
      }
      if(turnBakUrl['pack']){
        this.pakNum = turnBakUrl['pack'][0];
      }
    }
    this.product['pack'] = this.pakNum;

    if(new Date().getDay() == 0 && !this.modifiedClicked){
      var tmr = new Date().setDate(new Date().getDate() + 1);
      this.firstMon = this.getMonday(new Date(tmr));
    }else{
      if(new Date().getDay() == 0){
        var tmr = new Date().setDate(new Date().getDate() + 1);
        this.firstMon = this.getMonday(new Date(tmr));
      }else{
        this.firstMon = this.getMonday(new Date());
      }
    }
    if(this.dataService.orderNumberForSave){
      this.dataService.getCustomerHomePage().subscribe((item)=>{
        this.startTravelDay = item['dateFrom'];
        document.querySelector('#flagSix').scrollIntoView();
        let sendDataBak = {};
        sendDataBak['product'] = 'Travel';
        sendDataBak['pack'] = this.pakNum;
        sendDataBak['startDate'] = this.startTravelDay;
        this.dataService.ifOnlyStartDayOnly(sendDataBak).subscribe((item) => {
          this.cusPackageList = item['cusPackageList'];
          this.packageList = item['packageList'];
          item.cusPackageList.filter(val => val.isDefaultPackage == true).map(
              value => this.defaultCustomerPkg = value
          );

          item.packageList.filter(val => val && val.isDefaultPackage).map(value =>
              this.selectedPackage = value
          );
          this.selectedPackageName = this.selectedPackage['packageName'];
          this.secondaryItems = this.selectedPackage['secondaryItems'];
          this.toGetImgUrl(this.secondaryItems);
          this.pkgPrimary = this.selectedPackage['primaryItems'];
          this.featureDesc = this.selectedPackage['featureDesc'];
          this.toGetLogo(this.selectedPackage['companyCode']);
          this.fireInTheHole(this.selectedPackage['packageId'] - 1);
          this.tableList = this.selectedPackage['table'];
          console.log('table', this.tableList);

          this.cusPackageList = item.cusPackageList;
          this.defaultCustomerPkg['secondaryItems'].forEach((item) => {
            var objBack = {};
            item['amountList'].forEach((unit) => {
              if(unit['isDefaultOption'] == true) {
                objBack['companyCode'] = item['companyCode'];
                objBack['itemCode'] = item['insItemCode'];
                objBack['amountCode'] = unit['amountCode'];
                this.cusItemJson.push(objBack);
              }
            });
          });

          this.toGetImgUrl(this.defaultCustomerPkg['secondaryItems']);
          if(this.pkgCustomGo == false){
            this.getPriceServiceData();
          } else {
            this.toGetCusPkgPrice();
          }
        });
        this.systemDate = item.systemDate;
        this.diffDays = item['datePeriod'];
        this.endTravelDay = item['dateTo'];
        // this.pkgCustomGo = item['isCusPackage'];
        this.purposeGo = item['purpose'];
        this.doneSelPurpose = true;
        this.resetBackCountry = item['country'];
        this.selectedCountries = item['country'];
        this.tryGetFavor(item['country']);
        if(this.diffDays && this.startTravelDay && this.endTravelDay){
          this.tableShowHidden = true;
        }
        this.dataService.getIniData(this.product).subscribe((posts) => {
          this.countries = posts.countryList;
          this.toGetCountryList(this.countries);
          this.changeCountries('');
          this.systemDate = posts.systemDate;
        });
        try {
          var goDownFlag = JSON.parse(sessionStorage.getItem('bak'));
          if(goDownFlag || this.dataService.toGoDown){
            document.querySelector('#flagSix').scrollIntoView();
            sessionStorage.removeItem('bak');
          }
        } catch (e) {
        }
      })
    }

    this.dataService.getIniData(this.product).subscribe((posts) => {
      var array = [];
      posts.bannerList.forEach((item) => {
        let objImage = {};
        objImage['imageUrl'] =  item.imageUrl;
        objImage['hoverText'] = item.hoverText;
        objImage['linkUrl'] = item.linkUrl;
        objImage['clickAndGoToAncher'] = item.clickAndGoToAncher;
        array.push(objImage);
      });
      this.images = array;

      this.countries = posts.countryList;
      console.log(this.countries);
      this.data = posts;

      if(!this.dataService.orderNumberForSave){
        this.packageList = posts.packageList;
        posts.cusPackageList.filter(val => val.isDefaultPackage == true).map(
            value => this.defaultCustomerPkg = value
        );

        posts.packageList.filter(val => val && val.isDefaultPackage).map(value =>
            this.selectedPackage = value
        );

        this.selectedPackageName = this.selectedPackage['packageName'];
        this.secondaryItems = this.selectedPackage['secondaryItems'];
        this.toGetImgUrl(this.secondaryItems);

        this.pkgPrimary = this.selectedPackage['primaryItems'];
        this.featureDesc = this.selectedPackage['featureDesc'];
        this.toGetLogo(this.selectedPackage['companyCode']);
        this.fireInTheHole(this.selectedPackage['packageId'] - 1);
        this.tableList = this.selectedPackage['table'];
        console.log('table', this.tableList);

        this.purposeList = posts.purposeList;
        this.cusPackageList = posts.cusPackageList;
        this.defaultCustomerPkg['secondaryItems'].forEach((item) => {
          var objBack = {};
          item['amountList'].forEach((unit) => {
            if(unit['isDefaultOption'] == true) {
              objBack['companyCode'] = item['companyCode'];
              objBack['itemCode'] = item['insItemCode'];
              objBack['amountCode'] = unit['amountCode'];
              this.cusItemJson.push(objBack);
            }
          });
        });
        this.toGetImgUrl(this.defaultCustomerPkg['secondaryItems']);
        try {
          var goDownFlag = JSON.parse(sessionStorage.getItem('bak'));
          if(goDownFlag || this.dataService.toGoDown){
            setTimeout(function(){
              document.querySelector('#flagSix').scrollIntoView();
            }, 1000);
            // sessionStorage.removeItem('bak');
          }
        } catch (e) {
        }
      }

      var d = new Date();
      var n = d.getDay();

      this.getDayFromBkend = (posts.productSetting['startDateLimit'] + n);
      this.theDayBeginingNeedToRun = this.getDayFromBkend + 10;
      this.startDayPlusLastDayNum = this.theDayBeginingNeedToRun;

      this.startDayLimit = posts.productSetting['startDateLimit'];
      this.ifTheStartIsPlusOneMoreDay = posts.productSetting['start'];
      this.systemDate = posts.systemDate;
      this.textOfOverDays = '超過' + (this.getDayFromBkend - n) + '天後才出發？';
      this.disabledDays = posts.disabledDateList;
      posts.disabledDateList.forEach((item) => {
        this.disabledDays.push(item.date);
      });
      posts.disabledDateList.forEach((item) => {
        this.disabledReason.push(item.reason);
      });
      this.numberOfgetDayFromBkendLastSun = this.getDayFromBkend;
      // console.log(posts.disabledDateList);
      console.log(posts);
      this.favCountry = posts['favCountry'] == null? [] : posts['favCountry'];
      this.travelPeriodLimit = posts.productSetting['travelPeriodLimit'];
      this.clickAddedTotalNum = this.travelPeriodLimit + this.getDayFromBkend + 10;
      this.toGetCountryList(this.countries);
      try {
        var goDownFlag = JSON.parse(sessionStorage.getItem('bak'));
        if(goDownFlag || this.dataService.toGoDown){
          setTimeout(function(){
            document.querySelector('#flagSix').scrollIntoView();
          }, 1000);
        }
      } catch (e) {
      }
    });
    this.changeCountries('');
  }

  ngAfterViewInit(){
    // alert('hi')
    try {
      var goDownFlag = JSON.parse(sessionStorage.getItem('bak'));
      if(goDownFlag || this.dataService.toGoDown){
        setTimeout(function(){
          document.querySelector('#flagSix').scrollIntoView();
        }, 100);
        sessionStorage.removeItem('bak');
      }
    } catch (e) {
    }
  }

  toCompatibilityUse(){
  }

  toGetCusPkgPrice() {
    let cusData = {};
    cusData['packageId'] = this.defaultCustomerPkg['packageId'];
    cusData['days'] = this.diffDays;
    cusData['cusItemJson'] = this.cusItemJson;
    this.finalPrice = this.dataService.getCusPkPrice(cusData).subscribe((item)=>{
      this.finalPrice = item
    });
    console.log('toGetCusPkgPrice', this.cusItemJson);

  }

  tryGetFavor(favorCon:any){
    this.selectedCountriesId = favorCon['traceGroupId'];
    this.selectedCountry = favorCon['code'];
    this.selectedCountryStr = favorCon['name'];
    // if(this.resetBackCountry){
    // }else{
      this.selectedCountries = '';
      var nameStr;
      this.countries.forEach((el) => {
        if(el['groupId'] == favorCon['traceGroupId']){
          nameStr = el;
          this.selectedCountries = nameStr;
        }
      });
    // }


    this.isDoneSelectedPlaces = true;
    document.querySelector('#flagTwo').scrollIntoView();
  }

  changePurpose() {
    this.doneSelPurpose = false;
  }

  doNotNeedToShow: boolean = false;
  doNotNeed(number, val) {
    var returnArr = [];
    this.cusItemJson.forEach((item) => {
      if(item['itemCode'] == val){

      }else {
        returnArr.push(item);
      }
    })
    // alert($('.noNeedClassForWord' + number).is(':visible'));
    // $('#ele'+number+' .divAmtLong p').remove();
    // $('.amtBtnClickToShow'+number).remove();
    this.cusItemJson = returnArr;
    this.toGetCusPkgPrice();
    var idNum = $('#titlePkg .toShowContentAccordion').length;

    // console.log(idNum);
    // $('#specialWordDivDetail p').remove();
    // for(let i = 0; i <= idNum; i++){
    //   $('.amtBtnClickToShow'+i).slideUp();
    // }

    // this.selectedPackage['secondaryItems'].forEach((item)=>{
    //   console.log(item);
    // });

    // $('.amtBtnClickToShow'+number).slideUp('fast');
    // $('.needClassForWord'+number).slideUp('fast');
    // for(let i = 0; i <= idNum; i++){
    //   if ($('.amtBtnClickToShow'+i).is(':visible')) {
    //     console.log('true', i);
    //   } else {
    //     console.log('false', i);
    //   }
    // }
    $('.noNeedClassForWord'+number).removeAttr('hidden');

    if(!this.doNotNeedToShow){
      this.doNotNeedToShow = true;
      $('.noNeedClassForWord'+number).slideDown('fast');
      $('.amtBtnClickToShow'+number).slideUp('fast');
    }else{
      $('.amtBtnClickToShow'+number).slideUp('fast');
      $('.needClassForWord'+number).slideUp('fast');
      $('.noNeedClassForWord'+number).slideDown('fast');
    }
  }

  objectLength(obj) {
    var result = 0;
    for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // or Object.prototype.hasOwnProperty.call(obj, prop)
        result++;
      }
    }
    return result;
  }

  determineHideOrShow(lists, number) {

    var reArray = [];
    lists.forEach((item) => {
      reArray.push(item['isDefaultOption'])
    })
    if(reArray.indexOf(true) >= 0){
      return false;
    } else {
      return true;
    }
  }

  amountBtnClick(number, val, itemCode, dunNeedValue, valueItem) {
    console.log('number', number);
    console.log('val', val);
    console.log('itemCode', itemCode);
    console.log('dunNeedValue', dunNeedValue);
    console.log('valueItem', valueItem);
    console.log('select', this.thisSelect.nativeElement.value);
    if(dunNeedValue == 'dunNeed'){
     this.doNotNeed(number, itemCode);

    }else{
      this.amtBtnClickToShow = false;
      let cusAmtCode = dunNeedValue;
      // this.doNotNeedToShow = false;
      let cusData = {};
      cusData['packageId'] = this.selectedCustomePkg.packageId;
      cusData['days'] = this.diffDays;

      var cusPkObj = {};
      cusPkObj['companyCode'] = this.selectedCustomePkg['companyCode'];
      cusPkObj['itemCode'] = itemCode;
      if(window.innerWidth <= 480){
        cusPkObj['amountCode'] = dunNeedValue;
      }else{
        cusPkObj['amountCode'] = val['amountCode'];
      }

      this.cusItemJson.push(cusPkObj);
      this.cusItemJson.filter(item => item['itemCode'] == itemCode).map(
          (value) => {
            let index = this.cusItemJson.indexOf(value);
            var arry = this.cusItemJson;
            arry.splice(index, 1);
            console.log('array', arry);
            this.cusItemJson = arry;
            this.cusItemJson.push(cusPkObj);
          }
      );
      var uniqueItemJson = [];
      $.each(this.cusItemJson, function(i, el){
        if($.inArray(el, uniqueItemJson) === -1) uniqueItemJson.push(el);
      });
      this.cusItemJson = uniqueItemJson;
      if(dunNeedValue || window.innerWidth <= 480){
        this.selectedCustomePkg['secondaryItems'].filter(item => item['insItemCode'] == itemCode).map((value)=>{
          value['amountList'].forEach((item)=>{
            if(item['amountCode'] == dunNeedValue){
              val = item;
              if(val){
                var html = '';
                for(let i = 0; i < val['longDetailList'].length; i++){
                  html += '<p>';
                  html += val['longDetailList'][i].desc;
                  html += '</p>';
                }
                $('#ele'+number+' .divAmtLong p').remove();
                $('.amtBtnClickToShow'+number).remove();
                $('#ele'+number+' .divAmtLong').append(html);
              }
            }
          })
        })
      }

      this.toGetCusPkgPrice();
      if(val){
        var html = '';
        for(let i = 0; i < val['longDetailList'].length; i++){
          html += '<p>';
          html += val['longDetailList'][i].desc;
          html += '</p>';
        }
        $('#ele'+number+' .divAmtLong p').remove();
        $('.amtBtnClickToShow'+number).remove();
        $('#ele'+number+' .divAmtLong').append(html);
      }

      // if(!this.doNotNeedToShow){
      //   this.doNotNeedToShow = true;
      //   $('.noNeedClassForWord'+number).slideUp('fast');
      //   $('.amtBtnClickToShow'+number).slideDown('fast');
      // }else{
      //   $('.amtBtnClickToShow'+number).slideDown('fast');
      //
      // }
      if(!this.doNotNeedToShow){
        this.doNotNeedToShow = true;
        $('.noNeedClassForWord'+number).slideUp('fast');
        $('.amtBtnClickToShow'+number).slideDown('fast');
      }else{
        $('.amtBtnClickToShow'+number).slideDown('fast');
        $('.needClassForWord'+number).slideDown('fast');
        $('.noNeedClassForWord'+number).slideUp('fast');
      }
    }
  }

  toTogglePurposeBtn(clz, value) {
    // var body = $("html, body");
    // if(window.innerWidth <= 500){
    //   body.stop().animate({scrollTop:1105}, 200, 'swing', function() {
    //   });
    // }else{
    //   body.stop().animate({scrollTop:1265}, 200, 'swing', function() {
    //   });
    // }
    document.querySelector('#flagThree').scrollIntoView();
    this.purposeGo = value.name;
    this.doneSelPurpose = true;
    $('.' + clz).children('.checkBtn').addClass('hidden');
    $('.' + clz).children('.checkBtn').removeClass('hidden');
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  pkgCustomToggle() {
    this.pkgCustomGo = !this.pkgCustomGo;
    setTimeout(function(){
      $('.toShowContentAccordion').hide();
      $('#mainLongDetailDiv').hide();
      $('#mobileAmt').show();
    }, 100);
    // if(window.innerWidth <= 500){
    //   setTimeout(function(){
    //     $('.toShowContentAccordion').slideUp('fast');
    //   }, 200);
    // }
    document.querySelector('#flagSix').scrollIntoView();

    if(this.pkgCustomGo){
      this.selPkgH2 = '自訂方案';
      this.pkgCustomTxt = '回建議方案挑選';
      this.toGetCustomPackageContent(this.defaultCustomerPkg);
    } else {
      this.selPkgH2 = '選擇方案';
      this.pkgCustomTxt = '挑不到想要的?點我自己選';
      this.dataService.getIniData(this.product).subscribe((posts) => {
        posts.packageList.filter(val => val && val.isDefaultPackage).map(value =>
            this.selectedPackage = value
        );
        this.selectedPackageName = this.selectedPackage['packageName'];
        this.secondaryItems = this.selectedPackage['secondaryItems'];
        this.toGetImgUrl(this.secondaryItems);
        this.pkgPrimary = this.selectedPackage['primaryItems'];
        this.featureDesc = this.selectedPackage['featureDesc'];
        this.toGetLogo(this.selectedPackage['companyCode']);
        this.fireInTheHole(this.selectedPackage['packageId'] - 1);
        this.tableList = this.selectedPackage['table'];
        console.log('table', this.tableList);
      });
      this.getPriceServiceData();
    }
  }

  getDayArr(lastDay, firstDay){
    // console.log(new Date(firstDay).getDay());
    // var oneDay = 24*60*60*1000;
    // var firstDate = new Date(this.getMonday(lastDay));
    // var seconDate = new Date(firstDay);
    // var diffDays = Math.round(Math.abs((firstDate.getTime() - seconDate.getTime())/(oneDay)));
    // if(diffDays == 6){
    //   diffDays++
    // }

    let diffDays = new Date(firstDay).getDay();
    let returnArr = [];
    for(let i = 1; i <= diffDays; i++){
      returnArr.push(i);
    }
    return returnArr;
  }

  theDaysMissed: number;
  theTimeClicked: number = 2;
  startDayPlusLastDayNum: any;
  toShowMoreDaysFun() {
    this.theTimeClicked++;
    if(this.theTimeClicked == this.totalTimesTimes){
      this.getDayFromBkend = this.travelPeriodLimit;
      this.selectTravelDayIsDone = false;
      this.toShowMoreDays = false;
      this.textOfOverDays = '出國超過' + this.travelPeriodLimit + '天？';
    }else{
      let testDayAddOneMonth = new Date(new Date().getFullYear(), new Date().getMonth()+this.theTimeClicked, 0);
      let day = 1000*60*60*24;
      var diffDays2 = Math.round(Math.abs((new Date().getTime() - new Date(testDayAddOneMonth).getTime())/(day)));
      if(this.theTimeClicked == 5){
        this.getDayFromBkend = this.travelPeriodLimit;
      }else{
        this.getDayFromBkend = diffDays2;
      }
    }
    // if(this.getDayFromBkend == this.travelPeriodLimit){

    // } else {
    //   this.getDayFromBkend = this.getDayFromBkend + (this.travelPeriodLimit/5);
    // }
  }

  toModifiedDays() {
    this.tableShowHidden = false;
    this.selectTravelDayIsDone = false;
    this.modifiedClicked = true;
    if(new Date().getDay() == 0){
      var tmr = new Date().setDate(new Date().getDate() + 1);
      this.firstMon = this.getMonday(new Date(tmr));
    }else{
      this.firstMon = this.getMonday(new Date());
    }
    this.startTravelDay = '';
    this.endTravelDay = '';
    this.theTimeClicked = 2;
    this.toShowMoreDays = false;
    this.getDayFromBkend = this.startDayLimit;
    this.theDayBeginingNeedToRun = this.getDayFromBkend + 10;

    this.textOfOverDays = '超過' + this.getDayFromBkend + '天後出發？';

    // let countWeek = function(){
    //   var date = new Date(),
    //       prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    //   return prefixes[0 | date.getDate() / 8];
    // }
    // if(countWeek() == 'First') {
    //   this.startTravelDayOn = true;
    // }
    // var body = $("html, body");
    // if(window.innerWidth <= 500){
    //   body.stop().animate({scrollTop:1105}, 200, 'swing', function() {
    //   });
    // }else{
    //   body.stop().animate({scrollTop:1265}, 200, 'swing', function() {
    //   });
    // }
    document.querySelector('#flagFour').scrollIntoView();
  }

  totalTimesTimes:number;
  onClickMe($event, classValueBtn, numberBtn, value) {
    if(this.startTravelDay) {
      if (this.startTravelDay == value) {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('出發日、返回日不可為同一天');
        document.querySelector('#myModal').scrollIntoView();
        return false;
      }
    }
    if(this.selectTravelDayIsDone === false && !this.startTravelDay){
        this.textOfSelectingDays = '請點選旅程出發日與返回日';
        this.startTravelDay = $event.target.value;
        this.firstMon = new Date(this.startTravelDay);
        this.theDayBeginingNeedToRun = this.clickAddedTotalNum;
        this.totalTimesTimes = Math.round(this.travelPeriodLimit/30);
        // this.getDayFromBkend = diffDays;
        this.selectTravelDayIsDone = true;
        this.toShowMoreDays = true;
        var STD = this.startTravelDay;
        setTimeout(function(){
          $('.table button').each(function() {
            if($(this).val() == STD){
              $(this).find('.checkBtn').removeClass('hidden');
              $(this).find('.checkBtnTxt').removeClass('hidden');
            }
          });
        }, 100);
        document.querySelector('#flagFour').scrollIntoView();
      } else {
      if(this.startTravelDay) {
          if(this.startTravelDay == $event.target.value){
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
            this.dataService.AlertTXT = [];
            this.dataService.AlertTXT.push('出發日、返回日不可為同一天');
            document.querySelector('#myModal').scrollIntoView();
            return false;
          } else {
            let sendDataBak = {};
            sendDataBak['product'] = 'Travel';
            sendDataBak['pack'] = this.pakNum;
            sendDataBak['startDate'] = this.startTravelDay;
            if(!this.pkgCustomGo && this.startTravelDay && this.endTravelDay){
              this.dataService.ifOnlyStartDayOnly(sendDataBak).subscribe((item) => {
                console.log(item);
                this.cusPackageList = item['cusPackageList'];
                this.packageList = item['packageList'];
                item.cusPackageList.filter(val => val.isDefaultPackage == true).map(
                    value => this.defaultCustomerPkg = value
                );

                item.packageList.filter(val => val && val.isDefaultPackage).map(value =>
                    this.selectedPackage = value
                );

                this.selectedPackageName = this.selectedPackage['packageName'];
                this.secondaryItems = this.selectedPackage['secondaryItems'];
                this.toGetImgUrl(this.secondaryItems);

                this.pkgPrimary = this.selectedPackage['primaryItems'];
                this.featureDesc = this.selectedPackage['featureDesc'];
                this.toGetLogo(this.selectedPackage['companyCode']);
                this.fireInTheHole(this.selectedPackage['packageId'] - 1);
                this.tableList = this.selectedPackage['table'];
                console.log('table', this.tableList);
                this.cusPackageList = item.cusPackageList;
                this.defaultCustomerPkg['secondaryItems'].forEach((item) => {
                  var objBack = {};
                  item['amountList'].forEach((unit) => {
                    if(unit['isDefaultOption'] == true) {
                      objBack['companyCode'] = item['companyCode'];
                      objBack['itemCode'] = item['insItemCode'];
                      objBack['amountCode'] = unit['amountCode'];
                      this.cusItemJson.push(objBack);
                    }
                  });
                });
              });
            }

            console.log(this.startTravelDay);
            console.log(this.endTravelDay);
            this.endTravelDay = $event.target.value;

            if (this.startTravelDay && this.endTravelDay) {

            document.querySelector('#flagFive').scrollIntoView({block: 'start', behavior: 'smooth'});
            this.textOfSelectingDays = '您的旅遊期間';
            this.tableShowHidden = true;
            let oneDay = 24*60*60*1000;
            let firstDate = new Date(this.startTravelDay);
            let secondDate = new Date(this.endTravelDay);
            console.log(firstDate);
            console.log(secondDate);
              let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + 1;
              this.diffDays = diffDays;
              if(this.pkgCustomGo == false){
                  this.getPriceServiceData();
              } else {
                  this.toGetCusPkgPrice();
              }
            }
          }
        }
      }
  }

  fireInTheHole(val) {
    $('#remove'+ val).removeClass('hidden');
  }

  toggleClazForAngle: boolean = false;
  toShowCusDetailContent(text) {
    if(text){
      this.toggleClazForAngle = !this.toggleClazForAngle;
      $('#mainLongDetailDiv').slideToggle('fast');
    }
    if(this.getUpClz.nativeElement.children[2]['className'] == 'fa fa-angle-down'){
      for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
        if($('#paddingSpe i')[i]){
          if($('#paddingSpe i')[i]['className'] == 'fa fa-angle-up'){
            $('#paddingSpe i')[i]['className'] =  'fa fa-angle-down';
          }
        }
      }
      this.getUpClz.nativeElement.children[2]['className'] = 'fa fa-angle-up';
    } else if (this.getUpClz.nativeElement.children[2]['className'] == 'fa fa-angle-up') {
      for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
        if($('#paddingSpe i')[i]){
          if($('#paddingSpe i')[i]['className'] == 'fa fa-angle-up'){
            $('#paddingSpe i')[i]['className'] =  'fa fa-angle-down';
          }
        }
      }
      this.getUpClz.nativeElement.children[2]['className'] = 'fa fa-angle-down';
    }

    var idNum = $('#titlePkg .toShowContentAccordion').length;
    for(let x = 0; x <= idNum; x++) {
      $('#ele'+x).slideUp('fast');
    }
    $('#mainLongDetailDiv').slideToggle('fast');
  }

  toGetImgUrl(val:any){
    val.forEach((item) => {
      item['pictureCode'] = item['insItemCode'];
      if(item['pictureCode'] == 'ITEM_MEDICAL_DAY' ||
          item['pictureCode'] == 'TAK005' ||
          item['pictureCode'] == 'C_ITEM_MEDICAL'
      ){
        item['pictureCode'] = 'ITEM_MEDICAL_BILL'
      }
      if(item['pictureCode'] == 'ITEM_INCONVENIENT'){
        item['pictureCode'] == 'TAK002'
      }
      if(item['pictureCode'] == 'ITEM_SUDDEN_SICK'){
        item['pictureCode'] == 'TAK006'
      }
      if(item['pictureCode'] == 'C_DETAIL_RESCUE'){
        item['pictureCode'] == 'TAK009'
      }
    })
  }

  toGetCustomPackageContent(val) {
    // console.log(JSON.stringify(val));
    this.defaultCustomerPkg = val;
    if(val.length == 1){
      this.cusPackageList.forEach((item)=>{
        if(item['packageId'] == val){
          this.defaultCustomerPkg = item;
          this.selectedCustomePkg = item;
          this.cusItemJson = [];
          this.defaultCustomerPkg['secondaryItems'].forEach((item) => {
            var objBack = {};
            item['amountList'].forEach((unit) => {
              if(unit['isDefaultOption'] == true) {
                objBack['companyCode'] = item['companyCode'];
                objBack['itemCode'] = item['insItemCode'];
                objBack['amountCode'] = unit['amountCode'];
                this.cusItemJson.push(objBack);
              }
            });
          });
          this.toGetCusPkgPrice();
          this.cusSecondItemNa = this.selectedCustomePkg['secondaryItems'];
          this.toGetImgUrl(this.cusSecondItemNa);
          this.cusPrimaryItem = this.selectedCustomePkg['primaryItems'];
          if(this.pkgCustomGo){
            this.selectedPackageName = this.selectedCustomePkg['packageName'];
          } else {
            this.selectedPackageName = this.selectedPackage['packageName'];
          }
          this.pkgPrimary = this.selectedCustomePkg['primaryItems'];
          this.toGetLogo(this.selectedCustomePkg['companyCode']);
        }
      });
    }else{
      this.cusItemJson = [];
      console.log('secondaryItems', this.defaultCustomerPkg['secondaryItems'])
      this.defaultCustomerPkg['secondaryItems'].forEach((item) => {
        var objBack = {};
        item['amountList'].forEach((unit) => {
          if(unit['isDefaultOption'] == true) {
            objBack['companyCode'] = item['companyCode'];
            objBack['itemCode'] = item['insItemCode'];
            objBack['amountCode'] = unit['amountCode'];
            this.cusItemJson.push(objBack);
          }
        });
      });
      this.toGetCusPkgPrice();

      this.selectedCustomePkg = val;
      this.cusSecondItemNa = this.selectedCustomePkg['secondaryItems'];
      this.toGetImgUrl(this.cusSecondItemNa);
      this.cusPrimaryItem = this.selectedCustomePkg['primaryItems'];
      if(this.pkgCustomGo){
        this.selectedPackageName = this.selectedCustomePkg['packageName'];
      } else {
        this.selectedPackageName = this.selectedPackage['packageName'];
      }
      this.pkgPrimary = this.selectedCustomePkg['primaryItems'];
      this.toGetLogo(this.selectedCustomePkg['companyCode']);
    }

    setTimeout(function(){
      $('#mainLongDetailDiv').hide();
      $('.toShowContentAccordion').hide();
    }, 100);

    // if(window.innerWidth <= 500){
    //   setTimeout(function(){
    //     $('#mainLongDetailDiv').slideUp('fast');
    //     $('.toShowContentAccordion').slideUp('fast');
    //   }, 300);
    // }
  }

  returnIfNoNeedIsNeed(obj) {
    if(obj.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  toGetLogo(val) {
    switch(val){
      case 'TaiAn':
        this.logoImgSrc = 'assets/images/logos/taian.jpg';
        break;
      case 'MingTai':
        this.logoImgSrc = 'assets/images/logos/mitai.jpg';
        break;
    }
  }

  clickWannaInsuredBtn(value, link) {
    console.log(link);
    if(link){
      window.location.href = link;
    }
    document.querySelector('#flagOne').scrollIntoView();
  }

  toCloseAll(val) {
    for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
      if($('#paddingSpe i')[i]){
        if($('#paddingSpe i')[i]['className'] == 'fa fa-angle-up'){
          $('#paddingSpe i')[i]['className'] = 'fa fa-angle-down';
        }
      }
    }

    $('#ele'+val).slideUp('fast');

    var idNum = this.el.nativeElement.lastElementChild.id.slice(3,4);

    for(let x = 0; x <= idNum; x++) {
      $('#ele'+x).slideUp('fast');
    }
    $('#mainLongDetailDiv').slideUp('fast');
  }

  toGetShowContentOfPkg(id, number, objClick){
    setTimeout(function(){
    }, 300);
    for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
      if($('#paddingSpe i')[i]){
        if($('#paddingSpe i')[i]['className'] == 'fa fa-angle-up'){
          $('#paddingSpe i')[i]['className'] =  'fa fa-angle-down';
          objClick.children[1]['className'] = 'fa fa-angle-up';
        }
      }
    }

    if ($('#'+id).is(':visible')) {
      objClick.children[1]['className'] = 'fa fa-angle-down';
    } else {
      objClick.children[1]['className'] = 'fa fa-angle-up';
    }

    this.paddingBottonZero = false;
    var idNum = $('#titlePkg .toShowContentAccordion').length;

      for(let x = 0; x <= idNum; x++) {
        $('#ele'+x).slideUp('fast');
      }
    $('#mainLongDetailDiv').slideUp('fast');
    if(id == this.el.nativeElement.lastElementChild.id) {
      this.paddingBottonZero = true;
    }
    if ($('#'+id).is(':visible')) {
      $('#'+id).slideUp('fast');
    } else {
      $('#'+id).slideDown('fast');
    }
  }

  returnMonth(monDay) {
    // let day = new Date(monDay).getDate();
    let month = new Date(monDay).getMonth()+1;
    // let lastSun = this.getLastSunday(new Date(monDay));
    // console.log(day);
    // console.log(lastSun);
    if(new Date(monDay) >= new Date()){
      return month;
    }else if(new Date(monDay) < new Date()){
      return new Date().getMonth()+1;
    }
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  toGetCountryList(val) {
    this.selectedCountries = val[0];
    this.selectedCountriesId;
  }

  toGetPackageContent(val, classValueIs) {
    $('.longTri').addClass('hidden');
    $('#' + classValueIs).removeClass('hidden');
    if(val){
      this.selectedPackage = val;
      this.selectedPackageName = val.packageName;
      this.secondaryItems = this.selectedPackage['secondaryItems'];
      this.toGetImgUrl(this.secondaryItems);
      this.toGetLogo(this.selectedPackage['companyCode']);
      this.pkgPrimary = this.selectedPackage['primaryItems'];
      this.tableList = this.selectedPackage['table'];
      let dataBak = {};
      dataBak['packageId'] = this.selectedPackage['packageId'];
      dataBak['days'] = this.diffDays;

      this.dataService.getPkPrice(dataBak).subscribe((item) => {
        this.finalPrice = item;
      });
      this.featureDesc = this.selectedPackage['featureDesc'];
      for (var i = 0; i <= this.pkgPrimary.length; i++){
      }
    }
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }

  toggleDoneSelect() {
    this.isDoneSelectedPlaces = true;
    var b = this.selectedCountry;
    var a;
    this.selectedCountries.countryList.forEach(function(el){
      if(el.code ==  b) {
       a = el.name;
      }
    })
    this.selectedCountryStr = a;
    document.querySelector('#flagTwo').scrollIntoView();
  }

  isLastDay(dt) {
  var test = new Date(dt.getTime()),
      month = test.getMonth();

  test.setDate(test.getDate() + 1);
  return test.getMonth() !== month;
}

  modifiedPlaces() {
    this.isDoneSelectedPlaces = false;
    this.selectedCountry = '';
  }

  changeCountries(item) {
    if(this.resetBackCountry){
      for(let i = 0; i <= this.countries.length; i ++){
        if (this.countries[i]['groupId'] == this.selectedCountriesId) {
          this.selectedCountries = this.countries[i];
          console.log(this.selectedCountries);
        }
      }
      this.resetBackCountry = '';
    }else{
      this.selectedCountries = '';
      for(let i = 0; i <= this.countries.length; i ++){
        if (this.countries[i]['groupId'] == this.selectedCountriesId) {
          this.selectedCountries = this.countries[i];
        }
      }
    }
  }
  whichWeek(val){
    var date = new Date(val),
        prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

    return prefixes[0 | date.getDate() / 7];
  }

  lastDay:any;
  todayWhichWeek(monthDayCheck){
    var date = new Date(monthDayCheck);
    var day = date.getDate();
    day-=(date.getDay()==0?6:date.getDay()-1);//get monday of this week
    //special case handling for 0 (sunday)

    day+=7;
    //for the first non full week the value was negative

    var prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    return prefixes[0 | (day) / 7];
  }

  getRemanningDays() {
  var date = new Date();
  var time = new Date(date.getTime());
  time.setMonth(date.getMonth() + 1);
  time.setDate(0);
  var days =time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
  return days;
  }

  checkLastDayOfMonth() {
    let day = new Date().getDate();
    let numberDay = new Date().getDay();
    if((new Date().getDate()) <= day || (day <= 7 && numberDay != 0)){
      return false;
    }else{
      return true;
    }
  }

  toHiddenDate(value){
    if (this.startTravelDay) {
      var oneDay = 24 * 60 * 60 * 1000;
      var nextMonthLastDay = new Date(new Date(this.startTravelDay).getFullYear(), new Date(this.startTravelDay).getMonth() + this.theTimeClicked, 0);
      var startDayPlusLastDayNum = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit);
      var toGetLastWeekend = function () {
        var lastDayNeedToHide
        switch (new Date(startDayPlusLastDayNum).getDay()) {
          case 0:
            lastDayNeedToHide = 6;
            break;
          case 1:
            lastDayNeedToHide = 5;
            break;
          case 2:
            lastDayNeedToHide = 4;
            break;
          case 3:
            lastDayNeedToHide = 3;
            break;
          case 4:
            lastDayNeedToHide = 2;
            break;
          case 5:
            lastDayNeedToHide = 1;
            break;
          case 6:
            lastDayNeedToHide = 0;
            break;
          default:
        }
        return lastDayNeedToHide
      }
      var getSunDayOfTheWeek = new Date(startDayPlusLastDayNum).setDate(new Date(startDayPlusLastDayNum).getDate() + toGetLastWeekend());

      if (this.theTimeClicked == this.totalTimesTimes) {
        startDayPlusLastDayNum = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit);
        // let firstEndDay = new Date(this.firstMon).setDate(new Date(this.firstMon).getDate() + this.getDayFromBkend);
        // console.log(new Date(firstEndDay));

        let timeDiff = Math.abs(new Date(startDayPlusLastDayNum).getTime() - new Date(this.startTravelDay).getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.numberOfgetDayFromBkendLastSun = diffDays
      } else {
        var getDayBetween = Math.round(Math.abs((new Date(nextMonthLastDay).getTime() - new Date(this.startTravelDay).getTime()) / (oneDay)));
        startDayPlusLastDayNum = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + getDayBetween);
        var getDayBtnDays = new Date(nextMonthLastDay).setDate(new Date(nextMonthLastDay).getDate() + 1);
        let timeDiff = Math.abs(new Date(startDayPlusLastDayNum).getTime() - new Date(this.startTravelDay).getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.numberOfgetDayFromBkendLastSun = diffDays
      }
      if (new Date(value) > new Date(getSunDayOfTheWeek) || (new Date(value) > new Date(getDayBtnDays))) {
        return true;
      } else {
        return false;
      }
    }else{
      var todayPlusStartDayLimitAndDisaster = new Date().setDate(new Date().getDate() + this.startDayLimit);
      var lastPlustStartDayLimited = new Date().setDate(new Date().getDate() + this.startDayLimit);
      var lastDayNeedToHide;
      switch (new Date(lastPlustStartDayLimited).getDay()){
        case 0:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 6);
          break;
        case 1:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 5);
          break;
        case 2:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 4);
          break;
        case 3:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 3);
          break;
        case 4:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 2);
          break;
        case 5:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 1);
          break;
        case 6:
          lastDayNeedToHide = new Date(lastPlustStartDayLimited).setDate(new Date(lastPlustStartDayLimited).getDate() + 0);
          break;
        default:
      }
      if(new Date(todayPlusStartDayLimitAndDisaster).getDay() == 6 && new Date(value) >= new Date(todayPlusStartDayLimitAndDisaster) || new Date(value) > new Date(lastDayNeedToHide)){
        return true;
      }
    }

    //

    //
    //   if(new Date(value) > new Date(getSunDayOfTheWeek) || new Date(value) < new Date(theDayOfStartDaySun) || (new Date(value) > new Date(getDayBtnDays))){
    //     return true;
    //   }else{
    //     return false;
    //   }

    // else{
      var yesterday = new Date().setDate(new Date(this.getMonday(new Date())).getDate()-1);

    //   let yes = new Date(new Date().setDate(new Date().getDate()-1));
    //   if(new Date().getDate() == 1){
    //    if(new Date(value) < new Date(yes)){
    //      return true;
    //    }else if (new Date(value) > new Date(lastDayNeedToHide)){
    //      return true;
    //    }
    //  }else if (new Date(value) > new Date(lastDayNeedToHide)){
    //   return true;
    //  }else if(new Date(value) < new Date(yesterday)){
    //     return true;
    //  }else{
    //     if(new Date().getDay() == 6){
    //       let tmr = new Date(new Date().setDate(new Date().getDate()+1));
    //       if(new Date(value) < new Date(tmr)){
    //         return true;
    //       }else{
    //         return false;
    //       }
    //     }
    //   }
    // }
  }

  checkShoudShowTitle(val){
    // if(this.startTravelDay){
    //   var oneDay = 24*60*60*1000;
    //   var behindStartTravelDayHide = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate()-1 - new Date(this.startTravelDay).getDay());
    //   var nextMonthLastDay = new Date(new Date(this.startTravelDay).getFullYear(), new Date(this.startTravelDay).getMonth() + this.theTimeClicked, 0);
    //   var sunday = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() - new Date(this.startTravelDay).getDay());
    //   var sundayMinusOneDay = new Date(sunday).setDate(new Date(sunday).getDate() - 1);
    //   var getStartDayLastDay;
    //   if(this.theTimeClicked == this.totalTimesTimes){
    //     getStartDayLastDay = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit);
    //   }else{
    //     var getDayBetween =  Math.round(Math.abs((new Date(nextMonthLastDay).getTime() - new Date(this.startTravelDay).getTime())/(oneDay)));
    //     getStartDayLastDay = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + getDayBetween);
    //   }
    //   if((new Date(val).getDate() == 1) || (new Date(val) <= new Date(sunday)) && new Date(val).getDay() == 0 && new Date(val) > new Date(sundayMinusOneDay)){
    //     if(new Date(val) > new Date(getStartDayLastDay) || new Date(val) < new Date(behindStartTravelDayHide)){
    //       return false;
    //     }else{
    //       return true;
    //     }
    //   }else{
    //     return false;
    //   }
    // }else{
    //   var tmr = new Date().setDate(new Date().getDate() + 1);
    //   let sunday = new Date().setDate(new Date().getDate() - new Date().getDay());
    //   var lastDayNoStartDay = new Date().setDate(new Date().getDate() + this.startDayLimit - 1);
    //   if((new Date(val) < new Date(sunday) || new Date(val).getDate() == 1 || (new Date(val).getDay() == 0 && new Date(val) < new Date(tmr)))){
    //     if(new Date(val) > new Date(lastDayNoStartDay) || new Date(val) < new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))){
    //       return false;
    //     }else{
    //       return true;
    //     }
    //   }else{
    //     return false;
    //   }
    // }
  }

  buttonToDisabled(calVal) {
    var startDaysDisabled = new Date(this.startTravelDay);
    var buttonDate = new Date(calVal);
    var todayPlusStartDayLimitAndDisaster = new Date().setDate(new Date().getDate() + this.startDayLimit);
    var startDayPlusLimitedDay = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit - 1);

    if(this.startTravelDay){
      if(
          buttonDate < startDaysDisabled ||
          buttonDate > new Date(startDayPlusLimitedDay)
      ){
        return true;
      } else {
        return false;
      }
    }else{
      var theBeginingDay = new Date().setDate(new Date().getDate() + (this.ifTheStartIsPlusOneMoreDay - 1));
      if(
          buttonDate < new Date(theBeginingDay) ||
          buttonDate >= new Date(todayPlusStartDayLimitAndDisaster) ||
          buttonDate < new Date() ||
          buttonDate == new Date(this.systemDate)
      ){
        return true;
      } else {
        return false;
      }
    }
  }

  buttonToDisabledTwo(btnVal){
    let buttonDate = new Date(btnVal);
    for(var i = 0; i <= this.disabledDays.length; i++) {
      if (buttonDate.getTime() == new Date(this.disabledDays[i]).getTime() && new Date(this.disabledDays[i]).getTime() > new Date(this.testDay).getTime()) {
        return true;
      }
    }
  }

  checkShoGoNot(){
    if(window.innerWidth <= 500){
      return true;
    }else{
      return false;
    }
  }

  windowSizeCheck(){
    if(window.innerWidth <= 500){
      return true;
    }else{
      return false;
    }
  }

  getPriceServiceData() {
    let dataBak = {};
    dataBak['packageId'] = this.selectedPackage['packageId'];
    dataBak['days'] = this.diffDays;

     this.dataService.getPkPrice(dataBak).subscribe((item) => {
       this.finalPrice = item;
     });
  }

  toShowPkgDetail() {
    this.showPkgDestail = !this.showPkgDestail;
  }

  iDLikeToGoInsuredBtn(){
    if(!this.selectedCountry){
        this.dataService.idToGoFlow = 'flagOne';
        var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('請選擇國家');
      document.querySelector('#myModal').scrollIntoView();
      return false;
    } else if(!this.purposeGo){
        this.dataService.idToGoFlow = 'flagTwo';
        var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('目的');
        document.querySelector('#myModal').scrollIntoView();
      return false;
    } else if(!this.transportation){

    }else if(!this.startTravelDay){
        document.querySelector('#myModal').scrollIntoView();
        this.dataService.idToGoFlow = 'flagFour';
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請選擇出發日期');
        document.querySelector('#myModal').scrollIntoView();

    } else if(!this.endTravelDay){
        document.querySelector('#myModal').scrollIntoView();
        this.dataService.idToGoFlow = 'flagFour';
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請選擇回國日期');
        document.querySelector('#myModal').scrollIntoView();
    }

    if(this.selectedCountry &&
       this.purposeGo &&
       this.transportation &&
       this.startTravelDay &&
       this.endTravelDay
    )
    {
      let dataToSendBack = {};
      dataToSendBack['orderNumber'] = '';
      dataToSendBack['countryCode'] = this.selectedCountry;
      dataToSendBack['cityId'] = 0;
      dataToSendBack['purpose'] = this.purposeGo;
      dataToSendBack['transport'] = this.transportation;
      dataToSendBack['startDate'] = this.startTravelDay;
      dataToSendBack['endDate'] = this.endTravelDay;
      dataToSendBack['trackingId'] = this.trackNum;


      dataToSendBack['packageId'] = this.selectedPackage['packageId'];

      var uniqueItemJson = [];
      $.each(this.cusItemJson, function(i, el){
        if($.inArray(el, uniqueItemJson) === -1) uniqueItemJson.push(el);
      });
      dataToSendBack['cusItemList'] = uniqueItemJson;
      if(this.pkgCustomGo){
        dataToSendBack['packageId'] = 0
        console.log('1234', this.defaultCustomerPkg['packageId']);
        console.log('14332142', this.selectedPackage['packageId']);
        dataToSendBack['cusPackageId'] = this.defaultCustomerPkg['packageId'];
      }else{
        dataToSendBack['cusPackageId'] = 0;
        dataToSendBack['packageId'] = this.selectedPackage['packageId'];
      }
      console.log(dataToSendBack);
      this.dataService.toSendInsuredDataToBakHomePage(dataToSendBack);
    }
  }
}
