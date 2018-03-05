import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  AfterViewChecked,
  AfterViewInit
 } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { RentalCarServiceService } from '../../services/rental-car-service.service';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-btobtoc',
  templateUrl: './btobtoc.component.html',
  styleUrls: ['./btobtoc.component.css']
})
export class BtobtoCComponent implements OnInit {
  images: Array<any> = [];
  changeTheIcon: Boolean;
  selectedBrand: any;
  brandList: Array<any> = [];
  selectBrandTxt: any = '';
  firstMon: any;
  firstWeekLastDay: any;
  getDayFromBkend: any;
  theDayBeginingNeedToRun: any;
  startDayPlusLastDayNum: any;
  startDayLimit: any;
  ifTheStartIsPlusOneMoreDay: any;
  systemDate: any;
  textOfOverDays: any;
  disabledDays: any;
  disabledReason: Array<any> = [];
  numberOfgetDayFromBkendLastSun: Number = 0;
  travelPeriodLimit: number;
  clickAddedTotalNum: number = 0;
  startTravelDay: string;
  endTravelDay: string;
  diffDays: number = 0;
  startTravelDayOn: Boolean = false;
  theDaysMissed: number;
  theTimeClicked: number = 2;  
  totalTimesTimes: number;
  tableShowHidden: Boolean = false;
  selectTravelDayIsDone: Boolean = false;
  modifiedClicked: Boolean = false;
  toShowMoreDays: Boolean = false;
  testDay: any = new Date();
  textOfSelectingDays: String = '請點選租車出發日與還車日';
  pakNum: any = '';
  pkgCustomGo: Boolean = false;
  cusPackageList: any;
  packageList: Array<any> = [];
  defaultCustomerPkg: any;
  selectedPackage: {};
  selectedPackageName: String = '';
  secondaryItems: any;
  pkgPrimary: any;
  featureDesc: String = '';
  tableList: any;
  cusItemJson: Array<any> = [];
  finalPrice: any = 0;
  logoImgSrc: string = '';
  timesHr: Array<any> = [];
  systemDateTime: any;
  selectValueHour: any = '';
  startHour: any;
  endHour: any;
  selectedCustomePkg: any;
  theDayUserSelected: string;
  pkgCustomTxt: string = '挑不到想要的?點我自由配';
  selPkgH2: string = '選擇方案';
  returnObj: Object = {};
  cusSecondItemNa: Array<any> = [];
  cusPrimaryItem: any;
  customBtn: Array<any> = [];
  customBtnAmt: Array<any> = [];
  showPkgDestail: Boolean = false;
  amtBtnClickToShow: Boolean = true;
  purposeList: Array<any> = [];
  toggleClazForAngle: Boolean = false;
  doNotNeedToShow: Boolean = false;
  paddingBottonZero: Boolean = false;
  CusDetailContent: Boolean = false;
  isDoneSelectedBrand: Boolean = false;
  secondSelectOn: Boolean;
  trackNum: any;
  endMin: String;
  systemHour: any;
  fourthBtn: {};
  startMinute: any = '00';
  endMinute: any = '00';

  @ViewChild('eleTest')  el:ElementRef;
  @ViewChild('getUpClz') getUpClz:ElementRef;
  @ViewChild('thisSelect') thisSelect:ElementRef;

  constructor (
    private routerAct: ActivatedRoute,
    private router: Router,
    private dataService: DataServiceService,
    private rentalCarService: RentalCarServiceService
  ) {
    window.scrollTo(0, 0);
    $('body,html').animate({scrollTop: '0px'}, 0);
  }

  ngOnInit() {
    this.returnObj['product'] = 'CarRental';
    this.returnObj['source'] = 'CAR_STORE_ONLINE';
    this.returnObj['pack'] = this.routerAct.queryParams['value']['pack'];
    this.trackNum = this.routerAct.queryParams['value']['__track'];
    this.toLoadRentalCar();
  }

  toLoadDefaultDate(val:object){
    this.startTravelDay = val['startTravelDay'];
    this.endTravelDay = val['endTravelDay'];
    this.startHour = val['startHour'] < 10? '0'+val['startHour'] : val['startHour'];
    this.endHour = val['endHour'] < 10? '0'+val['endHour'] : val['endHour'];
    let timeDiff = Math.abs(new Date(this.endTravelDay).getTime() - new Date(this.startTravelDay).getTime());
    this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(this.startTravelDay === this.endTravelDay){
      this.endMin = ':59';
      this.endMinute = '59';
    }else{
      this.endMin = '';
    }
    this.selectTravelDayIsDone = true;
    this.tableShowHidden = true;
    this.toSendHours();
  }

  toLoadRentalCar() {
    // at begining we call init data first
      this.fourthBtn = {};
      this.fourthBtn['packageId'] = '';
      this.fourthBtn['packageName'] = '自訂方案';
      this.fourthBtn['packageButtonName'] = '自訂方案';
      this.fourthBtn['featureDesc'] = '選擇最符合自己需要的方案';
      this.fourthBtn['secondaryItems'] = [];
      this.fourthBtn['companyCode'] = '';
      this.fourthBtn['primaryItems'] = [];
      this.fourthBtn['table'] = {};
      this.CusDetailContent = true;
      this.rentalCarService.getIniData(this.returnObj).do((posts) => {
        // banner images
        const array = [];
        posts.bannerList.forEach((item) => {
          const objImage = {};
          objImage['imageUrl'] =  item.imageUrl;
          objImage['hoverText'] = item.hoverText;
          objImage['linkUrl'] = item.linkUrl;
          objImage['clickAndGoToAncher'] = item.clickAndGoToAncher;
          array.push(objImage);
        });
        this.images = array;
        this.brandList = posts['carRentalBrandInfo']['brandList'];
        //click 回方案選擇
        if(this.routerAct.queryParams['value']['orderNumber']){
          this.dataService.orderNumberForSave = this.routerAct.queryParams['value']['orderNumber'];
          this.dataService.getCustomerHomePage().do((item)=>{
            const defultSelTime = {};
            defultSelTime['startTravelDay'] = item['dateFrom']; 
            defultSelTime['endTravelDay'] = item['dateTo']; 
            defultSelTime['endHour'] = item['dateToHour'];
            defultSelTime['startHour'] = item['dateFromHour'];
            this.toAddLiVal(item['carRentalBrand']);
            this.toLoadDefaultDate(defultSelTime);
            }).delay(500).subscribe(()=>{
              document.querySelector('#flagSix').scrollIntoView({block: 'start', behavior: 'smooth'});
            });
        }
        // calendar
        if(new Date().getDay() == 0){
          var tmr = new Date().setDate(new Date().getDate() + 1);
          this.firstMon = this.getMonday(new Date(tmr));
        }else{
          this.firstMon = this.getMonday(new Date());
        }
        this.toDeterminedIfDisabledDaysNeedToHide();

        var d = new Date();
        var n = d.getDay();

        this.getDayFromBkend = (posts.productSetting['startDateLimit'] + n);
        this.theDayBeginingNeedToRun = this.getDayFromBkend + 10;
        this.startDayPlusLastDayNum = this.theDayBeginingNeedToRun;
        this.startDayLimit = posts.productSetting['startDateLimit'];
        this.ifTheStartIsPlusOneMoreDay = posts.productSetting['start'];
        this.systemDate = posts.systemDate;
        this.systemDateTime = posts['systemDateTime'];
        this.textOfOverDays = '超過' + (this.getDayFromBkend - n) + '天後才出發？';
        this.disabledDays = posts.disabledDateList;
        this.packageList = posts.packageList;
        this.cusPackageList = posts.cusPackageList;
        this.systemHour = posts['systemDateTimeHour'] + 1;
        //
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
        posts.disabledDateList.forEach((item) => {
          this.disabledDays.push(item.date);
        });
        posts.disabledDateList.forEach((item) => {
          if (item.reason) {
            this.disabledReason = item.reason;
          }
        });
      
        this.numberOfgetDayFromBkendLastSun = this.getDayFromBkend;
        this.travelPeriodLimit = posts.productSetting['travelPeriodLimit'];
        this.clickAddedTotalNum = this.travelPeriodLimit + this.getDayFromBkend + 10;
      }).delay(500).subscribe((item)=>{
        if(this.trackNum){
          this.toAddLiVal(this.trackNum);
        }
        if(this.trackNum.length > 3){
          document.querySelector('#flagOne').scrollIntoView();
        }
      });
      $('body').css({
        '-webkit-overflow-scrolling': 'auto'
      });
      setTimeout(function(){
        $('body').css({
          '-webkit-overflow-scrolling': 'touch'
        });
      }, 500);
  }

  toDeterminedIfDisabledDaysNeedToHide() {
    var d = new Date(this.firstMon);
    d.setDate(d.getDate() - d.getDay());
    if(new Date(this.firstMon) > d) {
      this.firstWeekLastDay = '';
    } else {
      this.firstWeekLastDay = d.getFullYear() + '-' + (d.getMonth()+1).toString() + '-' + d.getDate().toString();
    }
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  clickWannaInsuredBtn(value, link) {
    console.log(link);
    if(link){
      window.location.href = link;
    }
    if(value){
      document.querySelector('#flagOne').scrollIntoView();
    }
  }

  changeClassStatus(value) {
    this.changeTheIcon = value;
    if (value) {
      document.getElementById('brandListName').style.display = 'inline-block';
      document.getElementById('brandListName2').style.display = 'none';
    } else {
      document.getElementById('brandListName').style.display = 'none';
      document.getElementById('brandListName2').style.display = 'inline-block';
    }
  }

  closeUl(val) {
    this.changeTheIcon = val;
    document.getElementById('brandListName').style.display = 'none';
    document.getElementById('brandListName2').style.display = 'none';
  }

  openUl() {
    document.getElementById('brandListName').style.display = 'none';
    document.getElementById('brandListName2').style.display = 'inline-block';
  }

  toAddLiVal(val:string) {
    console.log('this.brandlist', this.brandList);
    this.brandList.forEach((item) => {
      if(item.value == val){
        this.selectBrandTxt = item.name;
      }
    });
    this.selectedBrand = val;
    this.isDoneSelectedBrand = true;
    setTimeout(function(){
      document.querySelector('#flagThree').scrollIntoView();
    }, 300);
  }

  createRange(number) {
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  getDayArr(lastDay, firstDay) {
    let diffDays = new Date(firstDay).getDay();
    let returnArr = [];
    for(let i = 1; i <= diffDays; i++){
      returnArr.push(i);
    }
    return returnArr;
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
      var yesterday = new Date().setDate(new Date(this.getMonday(new Date())).getDate()-1);
  }

  toModifiedDays() {
    this.textOfSelectingDays = '請點選租車出發日與歸還日';
    this.tableShowHidden = false;
    this.selectTravelDayIsDone = false;
    this.modifiedClicked = true;
    if(new Date().getDay() == 0){
      var tmr = new Date().setDate(new Date().getDate() + 1);
      this.firstMon = this.getMonday(new Date(tmr));
    }else{
      this.firstMon = this.getMonday(new Date());
    }
    this.numberOfgetDayFromBkendLastSun = this.getDayFromBkend;
    this.startTravelDay = '';
    this.endTravelDay = '';
    this.startHour = '';
    this.endHour = '';
    this.theTimeClicked = 2;
    this.toShowMoreDays = false;
    this.getDayFromBkend = this.startDayLimit;
    this.theDayBeginingNeedToRun = this.getDayFromBkend + 10;

    this.textOfOverDays = '超過' + this.getDayFromBkend + '天後出發？';

    document.querySelector('#flagFour').scrollIntoView();
  }

  buttonToDisabledTwo(btnVal) {
    let buttonDate = new Date(btnVal);
    for(var i = 0; i <= this.disabledDays.length; i++) {
      if (buttonDate.getTime() == new Date(this.disabledDays[i]).getTime() && new Date(this.disabledDays[i]).getTime() > new Date(this.testDay).getTime()) {
        return true;
      }
    }
  }

  buttonToDisabled(calVal) {
    var startDaysDisabled = new Date(this.startTravelDay);
    var buttonDate = new Date(calVal);
    if(!this.startTravelDay){
      var todayPlusStartDayLimitAndDisaster = new Date().setDate(new Date().getDate() + this.startDayLimit-1);
    }else{
      var todayPlusStartDayLimitAndDisaster = new Date().setDate(new Date().getDate() + this.startDayLimit);
    }
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
      const theBeginingDay = new Date().setDate((new Date().getDate() - 1) + (this.ifTheStartIsPlusOneMoreDay));
      if(
          buttonDate < new Date(theBeginingDay) ||
          buttonDate >= new Date(todayPlusStartDayLimitAndDisaster) ||
          buttonDate === new Date(this.systemDate)
      ){
        return true;
      } else {
        return false;
      }
    }
  }

  checkShoGoNot()  {
    if (window.innerWidth <= 500) {
      return true;
    } else {
      return false;
    }
  }

  windowSizeCheck() {
    if(window.innerWidth <= 500){
      return true;
    }else{
      return false;
    }
  }

  toShowMoreDaysFun() {
    this.theTimeClicked++;
    if(this.theTimeClicked == this.totalTimesTimes){
      this.getDayFromBkend = this.travelPeriodLimit;
      this.selectTravelDayIsDone = false;
      this.toShowMoreDays = true;
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
  }

  toOpenHrsSel() {
    // this.selectValueHour = '';
    let modal = document.getElementById('calendarModal');
    modal.style.display = 'block';
    document.querySelector('#calendarModal').scrollIntoView();
    this.timesHr = [];
    console.log(this.startTravelDay);
    console.log(this.endTravelDay);
    console.log(this.startHour);
    console.log(this.endHour);

    if (this.startTravelDay && !this.endTravelDay && !this.startHour && !this.endHour) {
      this.theDayUserSelected = '出發時間';
      if (this.startTravelDay === this.systemDate) {
        // const maxhr = this.systemHour + 1;
        for(let i = this.systemHour; i <= 23; i++ ) {
          if(i <= 9) {
            const hrNUmber = '0' + i.toString();
            this.timesHr.push(hrNUmber);
          }else {
            const hrNUmber = i.toString();
            this.timesHr.push(hrNUmber);
          }
        }
      } else {
        for(let i = 0; i <= 23; i++ ) {
          if(i <= 9){
            const hrNUmber = '0' + i.toString();
            this.timesHr.push(hrNUmber);
          }else{
            const hrNUmber = i.toString();
            this.timesHr.push(hrNUmber);
          }
        }
      }
    } else if (this.endTravelDay && this.startTravelDay && this.startHour && !this.endHour) {
      this.theDayUserSelected = '還車時間';
      for(let i = 0; i <= 23; i++ ) {
        if(i <= 9) {
          const hrNUmber = '0' + i.toString();
          this.timesHr.push(hrNUmber);
        }else{
          const hrNUmber = i.toString();
          this.timesHr.push(hrNUmber);
        }
      }
    }
  }

  onClickMe($event, classValueBtn, numberBtn, value) {
    console.log('1',$event);
    console.log('2',classValueBtn);
    console.log('3',numberBtn);
    console.log('4',value);
    const userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPhone/i)) {
      document.getElementById('calendarTable').style.display = 'none';
      document.getElementById('calendarTable').style.display = 'block';
    }
    if (this.selectTravelDayIsDone === false && !this.startTravelDay) {
        this.textOfSelectingDays = '請點選租車出發日與還車日';
        this.startTravelDay = $event.target.value;
        this.toOpenHrsSel();
        this.firstMon = new Date(this.startTravelDay);
        this.theDayBeginingNeedToRun = this.clickAddedTotalNum;
        this.totalTimesTimes = Math.round(this.travelPeriodLimit / 30);
        // only temp click times for 30 days limit only so we turn the total times to 2
        this.totalTimesTimes = 2;
        this.selectTravelDayIsDone = true;
        if(this.totalTimesTimes === 2){
          this.toShowMoreDays = false;
          this.selectTravelDayIsDone = false;
          this.textOfOverDays = '租車超過' + this.travelPeriodLimit + '天？';
        }else{
          this.toShowMoreDays = true;
        }
        let STD = this.startTravelDay;
        setTimeout(function(){
          $('.table button').each(function() {
            if ($(this).val() === STD) {
              $(this).find('.checkBtn').removeClass('hidden');
              $(this).find('.checkBtnTxt').removeClass('hidden');
            }
          });
        }, 100);
        document.querySelector('#flagFour').scrollIntoView();
      } else {
        if (this.startTravelDay && this.startHour) {
          if (this.startTravelDay === value) {
            if(!this.startHour && this.startTravelDay === value) {
              this.toOpenHrsSel();
            // } else {
            //   this.startHour = '';
            //   this.toOpenHrsSel();
            }else if(this.startHour && this.startTravelDay === value){
              let modal = document.getElementById('currentModal');
              modal.style.display = 'block';
              document.querySelector('#currentModal').scrollIntoView();
              return false;
            }
          } else {
            if(this.startTravelDay && this.startHour && !this.endTravelDay && !this.endHour){
              this.returnObj['startDate'] = this.startTravelDay;
              this.endTravelDay = value;
              if(this.startTravelDay && this.startHour && this.endTravelDay && !this.endHour){
                this.toOpenHrsSel();
              }  
            } 
          }
        } else if(this.startTravelDay && !this.startHour){
          this.toOpenHrsSel();
        }
        if(this.startTravelDay && this.startHour && this.endTravelDay && !this.endHour) {
          this.toOpenHrsSel();
        }
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

  toGetImgUrl(val: any) {
    val.forEach((item) => {
      item['pictureCode'] = item['insItemCode'];
      if(item['pictureCode'] == 'ITEM_MEDICAL_DAY' ||
          item['pictureCode'] == 'TAK005' ||
          item['pictureCode'] == 'C_ITEM_MEDICAL' ||
          item['pictureCode'] == 'MEDICAL'
      ){
        item['pictureCode'] = 'smallerKai';
      }
      if(item['pictureCode'] == 'ITEM_INCONVENIENT'){
        item['pictureCode'] = 'TAK002';
      }
      if(item['pictureCode'] == 'ITEM_SUDDEN_SICK'){
        item['pictureCode'] = 'TAK006';
      }
      if(item['pictureCode'] == 'C_DETAIL_RESCUE'){
        item['pictureCode'] = 'TAK009';
      }
      if(item['pictureCode'] == 'C_DETAIL_RESCUE'){
        item['pictureCode'] = 'TAK009';
      }
      if(item['pictureCode'] == 'CAR_THIRD'){
        item['pictureCode'] = 'thirdRes';
      }
      if(item['pictureCode'] == 'CAR_THIRD'){
        item['pictureCode'] = 'thirdRes';
      }
      if(item['pictureCode'] == 'CAR_DAMAGE'){
        item['pictureCode'] = 'carBody';
      }
      //責任
      if(item['pictureCode'] == 'RESP'){
        item['pictureCode'] = 'responsibility';
      }
    })
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

  fireInTheHole(val) {
    $('#remove' + val).removeClass('hidden');
  }

  pkgCustomToggle() {
    $('.longTri').addClass('hidden');
    $('#remove3').removeClass('hidden');
    this.pkgCustomGo = !false;
    setTimeout(function(){
      $('.toShowContentAccordion').hide();
      $('#mainLongDetailDiv').hide();
      $('#mobileAmt').show();
    }, 100);  
    document.querySelector('#flagSix').scrollIntoView();
    var iOSMobile = !!navigator.platform && /iPhone/.test(navigator.platform);
    if(window.innerWidth <= 500 && iOSMobile){
      $('#btnOfPackages').find('.selectedRadio').removeClass('selectedRadio');
      $('.packageButton' + '3').siblings('span').addClass('selectedRadio');
      $('#btnOfPackages').find('.fa-check').addClass('hidden');
      $('.packageButton' + '3').siblings('span').empty();
      $('.packageButton' + '3').siblings('span').append('<i class="fa fa-check"></i>自由配').css(
        {
          'text-align': 'center',
          'display': 'block',
          'margin': '0 auto'
        }
      ); 
      $('#btnOfPackages span').css({
        'left': '10%'
      });
    }
    if(this.pkgCustomGo){
      this.selPkgH2 = '自由配';
      this.pkgCustomTxt = '回選擇方案挑選';
      this.toGetCustomPackageContent(this.defaultCustomerPkg);
    } else {
      this.selPkgH2 = '選擇方案';
      this.pkgCustomTxt = '挑不到想要的?點我自由配';
      
      this.rentalCarService.getIniData(this.returnObj).subscribe((posts) => {
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

  finishSelectHr(val) {
    this.selectValueHour = val;
    var modal = document.getElementById('calendarModal');
    modal.style.display = "none";
    if(this.selectValueHour === '25'){
      const systemDayForScope = new Date(this.systemDate).getFullYear().toString() + '-' + ((new Date(this.systemDate).getMonth()+1) < 10 ? '0'+(new Date(this.systemDate).getMonth()+1).toString(): (new Date(this.systemDate).getMonth()+1).toString()) + '-' + ((new Date(this.systemDate).getDate()) < 10 ? '0'+(new Date(this.systemDate).getDate()).toString(): (new Date(this.systemDate).getDate()).toString());
      if(this.startTravelDay == systemDayForScope){
        //differ day return
        this.closeUlTimeModal();
        this.endTravelDay = this.startTravelDay;
        this.endMin = ':59';
        this.endMinute = '59';
        if(!this.startHour){
          this.startHour = this.systemHour;
        }else{
          // this.startHour = '00';
        }
        this.endHour = '23';
        this.selectTravelDayIsDone = true;
        this.tableShowHidden = true;
        this.diffDays = 1;
        this.toSendHours();
      } else {
        //same day return
        this.closeUlTimeModal();
        // this.startTravelDay = new Date(this.systemDate).getFullYear().toString() + '-' + ((new Date(this.systemDate).getMonth()+1) < 10 ? '0'+(new Date(this.systemDate).getMonth()+1).toString(): (new Date(this.systemDate).getMonth()+1).toString()) + '-' + ((new Date(this.systemDate).getDate()) < 10 ? '0'+(new Date(this.systemDate).getDate()).toString(): (new Date(this.systemDate).getDate()).toString());
        this.endTravelDay = this.startTravelDay;
        this.endMin = ':59';
        this.endMinute = '59';
        if(!this.startHour){
          this.startHour = '00';
        } else {
          // this.startHour = this.systemHour;
        }
        this.endHour = '23';
        this.selectTravelDayIsDone = true;
        this.tableShowHidden = true;
        this.diffDays = 1;
        this.toSendHours();
      }
    }else{
      this.endMin = '';
      //normal select option 
      if(!this.selectValueHour){
        return false;
      }
      if (!this.startHour) {
        this.startHour = this.selectValueHour;
      } else if(!this.endHour) {
        this.endHour = this.selectValueHour;
        this.toSendHours();
      }
    }
  }

  toSendHours() {
    if(this.startTravelDay && this.endTravelDay){
      this.returnObj['startDate'] = this.startTravelDay;
      this.returnObj['endDate'] = this.endTravelDay;
      this.returnObj['startHour'] = this.startHour;
      this.returnObj['startMinute'] = this.startMinute;
      this.returnObj['endMinute'] = this.endMinute;
      this.returnObj['endHour'] = this.endHour;
      console.log('321456', this.returnObj);
      this.dataService.ifOnlyStartDayOnly(this.returnObj).subscribe((item) => {
        console.log(item);        
        var uniqueItemJson = [];
        $.each(this.cusItemJson, function(i, el){
          if($.inArray(el, uniqueItemJson) === -1) uniqueItemJson.push(el);
        });
        this.cusItemJson = [];
        this.cusPackageList = item['cusPackageList'];
        this.packageList = item['packageList'];

        item.cusPackageList.filter(val => val.isDefaultPackage == true).map(
            value => this.defaultCustomerPkg = value
        );

        item.packageList.filter(val => val && val.isDefaultPackage).map(value =>
            this.selectedPackage = value
        );

        $('#remove2').addClass('hidden');

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
        this.defaultCustomerPkg['secondaryItems'].forEach((pkItem) => {
          const objBack = {};
          pkItem['amountList'].forEach((unit) => {
            if(unit['isDefaultOption'] === true) {
              objBack['companyCode'] = pkItem['companyCode'];
              objBack['itemCode'] = pkItem['insItemCode'];
              objBack['amountCode'] = unit['amountCode'];
              this.cusItemJson.push(objBack);
            }
          });
        });
      });
      
      document.querySelector('#flagFive').scrollIntoView({block: 'start', behavior: 'smooth'});
        this.textOfSelectingDays = '您的租車期間';
        this.tableShowHidden = true;
        const oneDay = 24*60*60*1000;
        const firstDate = new Date(this.startTravelDay);
        const secondDate = new Date(this.endTravelDay);
        const startHrScope = (Number(this.startHour)+1).toString();
        const endHrScope = (Number(this.endHour)+1).toString();
        var firstDay = this.startTravelDay + ' ' + (startHrScope.length == 1 ? '0' + startHrScope : startHrScope) + ':00:00';
        var secondDay = this.endTravelDay + ' ' + (endHrScope.length == 1 ? '0' + endHrScope : endHrScope) + ':00:00';

        var a = moment(firstDay);
        var b = moment(secondDay);
        var diffDays = Math.ceil(b.diff(a, 'hours')/24);
        console.log(diffDays);

        // 1
        if(diffDays === 0) {
          this.diffDays = 1;
        } else {
          this.diffDays = diffDays;
        }
        if(this.pkgCustomGo === false){
          this.getPriceServiceData();
        } else {
          this.toGetCusPkgPrice();
        }
    
        // var iOSMobile = !!navigator.platform && /iPhone/.test(navigator.platform);
        // if(window.innerWidth <= 500 && iOSMobile){
        //   $('.freeChoice .fa-check').addClass('hidden');
        //   $('.packageButton' + '3').siblings('span').addClass('selectedRadio');
        //   $('#btnOfPackages').find('.fa-check').addClass('hidden');
        //   $('.packageButton' + '3').siblings('span').empty();
        //   $('.packageButton' + '3').siblings('span').append('<i class="fa fa-check hidden"></i>自由配').css(
        //     {
        //       'text-align': 'center',
        //       'display': 'block',
        //       'margin': '0 auto'
        //     }
        //   ); 
        //   $('#btnOfPackages span').css({
        //     'left': '10%'
        //   });
        // }
    
      }
  }

  toGetCustomPackageContent(val) {
    this.defaultCustomerPkg = val;
    console.log(val.length);
    if(val.length <= 2) {
      this.cusPackageList.forEach((item)=>{
        if(item['packageId'] == val){
          this.defaultCustomerPkg = item;
          console.log('default', this.defaultCustomerPkg);

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
    } else {
      this.cusItemJson = [];
      if(this.defaultCustomerPkg['secondaryItems']){
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
      }
      
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
  }

  toShowPkgDetail() {
    this.showPkgDestail = !this.showPkgDestail;
  }

  toGetPackageContent(val, classValueIs, number) {
    $('.longTri').addClass('hidden');
    $('#' + classValueIs).removeClass('hidden');
    this.pkgCustomGo = false;
    this.selPkgH2 = '選擇方案';
    this.pkgCustomTxt = '挑不到想要的?點我自由配';
    if(val){
      this.selectedPackage = val;
      this.selectedPackageName = val.packageName;
      this.secondaryItems = this.selectedPackage['secondaryItems'];
      this.featureDesc = this.selectedPackage['featureDesc'];
      this.pkgPrimary = this.selectedPackage['primaryItems'];
      this.tableList = this.selectedPackage['table'];
      this.toGetImgUrl(this.secondaryItems);
      this.toGetLogo(this.selectedPackage['companyCode']);
      let dataBak = {};
      dataBak['packageId'] = this.selectedPackage['packageId'];
      dataBak['days'] = this.diffDays;
      document.querySelector('#flagSix').scrollIntoView();
      this.dataService.getPkPrice(dataBak).subscribe((item) => {
        this.finalPrice = item;
      });
      
      var iOSMobile = !!navigator.platform && /iPhone/.test(navigator.platform);
      if(window.innerWidth <= 500 && iOSMobile){
        $('#btnOfPackages').find('.selectedRadio').removeClass('selectedRadio');
        $('.packageButton' + number).siblings('span').addClass('selectedRadio');
        $('#btnOfPackages').find('.fa-check').addClass('hidden');
        $('.packageButton' + number).siblings('span').empty();
        $('.packageButton' + number).siblings('span').append('<i class="fa fa-check"></i>'+this.selectedPackage['packageButtonName']).css(
          {
            'text-align': 'center',
            'display': 'block',
            'margin': '0 auto'
          }
        ); 
        $('#btnOfPackages span').css({
          'left': '10%'
        });
      }
      for (var i = 0; i <= this.pkgPrimary.length; i++){
      }
    }
  }

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

    const idNum = $('#titlePkg .toShowContentAccordion').length;
    for(let x = 0; x <= idNum; x++) {
      $('#ele'+x).slideUp('fast');
    }
    $('#mainLongDetailDiv').slideToggle('fast');
  }

  toCloseAll(val) {
    for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
      if($('#paddingSpe i')[i]) {
        if($('#paddingSpe i')[i]['className'] === 'fa fa-angle-up'){
          $('#paddingSpe i')[i]['className'] = 'fa fa-angle-down';
        }
      }
    }

    $('#ele'+val).slideUp('fast');

    const idNum = this.el.nativeElement.lastElementChild.id.slice(3,4);

    for(let x = 0; x <= idNum; x++) {
      $('#ele'+x).slideUp('fast');
    }
    $('#mainLongDetailDiv').slideUp('fast');
  }

  toGetShowContentOfPkg(id, number, objClick) {
    setTimeout(function(){
    }, 300);
    for(let i = 0; i <= $('#paddingSpe i').length; i ++) {
      if($('#paddingSpe i')[i]) {
        if($('#paddingSpe i')[i]['className'] === 'fa fa-angle-up'){
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
    const idNum = $('#titlePkg .toShowContentAccordion').length;

      for(let x = 0; x <= idNum; x++) {
        $('#ele'+x).slideUp('fast');
      }
    $('#mainLongDetailDiv').slideUp('fast');
    if(id === this.el.nativeElement.lastElementChild.id) {
      this.paddingBottonZero = true;
    }
    if ($('#'+id).is(':visible')) {
      $('#'+id).slideUp('fast');
    } else {
      $('#'+id).slideDown('fast');
    }
  }

  doNotNeed(number, val) {
    var returnArr = [];
    this.cusItemJson.forEach((item) => {
      if(item['itemCode'] == val){

      }else {
        returnArr.push(item);
      }
    })
    
    this.cusItemJson = returnArr;
    this.toGetCusPkgPrice();
    var idNum = $('#titlePkg .toShowContentAccordion').length;

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

  returnIfNoNeedIsNeed(obj) {
    if(obj.length == 0) {
      return true;
    } else {
      return false;
    }
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

  modifiedBrand() {
    this.selectBrandTxt = '';
    this.selectedBrand = '';
    this.isDoneSelectedBrand = false;
  }

  closeUlTimeModal() {
    var modal = document.getElementById('calendarModal');
    modal.style.display = "none";
    
    var modal = document.getElementById('currentModal');
    modal.style.display = "none";
  }

  RentalCarIsGoingToInusre() {
      if(!this.selectedBrand) {
        let modal = document.getElementById('myModal');
        modal.style.display = 'block';
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請輸入車行');
        this.dataService.idToGoFlow = 'flagOne';
      }else{
        if(
          !this.startTravelDay ||
          !this.endTravelDay ||
          !this.startHour ||
          !this.endHour
        ) { 
          if(!this.startTravelDay || !this.startHour) {
            let modal = document.getElementById('myModal');
            modal.style.display = 'block';
            this.dataService.AlertTXT = [];
            this.dataService.AlertTXT.push('請選擇出發日期');
            this.dataService.idToGoFlow = 'calendarTableDiv';
          } else if(!this.endTravelDay || !this.endHour) {
            let modal = document.getElementById('myModal');
            modal.style.display = 'block';
            this.dataService.AlertTXT = [];
            this.dataService.AlertTXT.push('選擇還車日期');
            this.dataService.idToGoFlow = 'calendarTableDiv';
          }
        }else{
          if(
            this.selectedBrand &&
            this.startTravelDay &&
            this.endTravelDay &&
            this.startHour &&
            this.endHour
          ) {
            const dataToSendBack = {};
            dataToSendBack['orderNumber'] = this.routerAct.queryParams['value']['orderNumber'] ? this.routerAct.queryParams['value']['orderNumber'] : '';
            dataToSendBack['countryCode'] = '';
            dataToSendBack['cityId'] = 0;
            dataToSendBack['purpose'] = '觀光';
            dataToSendBack['transport'] = '汽車';
            dataToSendBack['startDate'] = this.startTravelDay;
            dataToSendBack['endDate'] = this.endTravelDay;
            dataToSendBack['startHour'] = this.startHour;
            dataToSendBack['startMinute'] = this.startMinute;
            dataToSendBack['endMinute'] = this.endMinute;
            dataToSendBack['endHour'] = this.endHour;
            dataToSendBack['trackingId'] = this.selectedBrand;
    
    
            dataToSendBack['packageId'] = this.selectedPackage['packageId'];
            
            var uniqueItemJson = [];
            $.each(this.cusItemJson, function(i, el){
              if($.inArray(el, uniqueItemJson) === -1) uniqueItemJson.push(el);
            });
            dataToSendBack['cusItemList'] = uniqueItemJson;
            if(this.pkgCustomGo){
              dataToSendBack['packageId'] = 0
              dataToSendBack['cusPackageId'] = this.defaultCustomerPkg['packageId'];
            }else{
              dataToSendBack['cusPackageId'] = 0;
              dataToSendBack['packageId'] = this.selectedPackage['packageId'];
            }

           
            this.rentalCarService.RentalCarIsGoingToInusre(dataToSendBack);
        }
      }
      }
  }
}
