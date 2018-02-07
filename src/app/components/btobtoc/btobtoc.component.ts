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
  textOfSelectingDays: String = '請點選旅程出發日與返回日';
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






  constructor(
    private routerAct: ActivatedRoute,
    private router: Router,
    private dataService: DataServiceService,
    private rentalCarService: RentalCarServiceService
  ) {
    window.scrollTo(0, 0);
    $('body,html').animate({scrollTop: '0px'}, 0);
  }

  ngOnInit() {
    this.toLoadRentalCar();
  }

  toLoadRentalCar(){
    const returnObj = {};
    returnObj['product'] = 'CarRental';
    returnObj['source'] = 'CAR_STORE_ONLINE';
    returnObj['pack'] = this.routerAct.queryParams['value']['pack'];

    this.rentalCarService.getIniData(returnObj).subscribe((posts) => {
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

      // calendar
      if (new Date().getDay() === 0) {
        const tmr = new Date().setDate(new Date().getDate() + 1);
        this.firstMon = this.getMonday(new Date(tmr));
      } else {
        this.firstMon = this.getMonday(new Date());
      }
      this.toDeterminedIfDisabledDaysNeedToHide();
      const d = new Date();
      const n = d.getDay();

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
        if (item.reason) {
          this.disabledReason = item.reason;
        }
      });
      this.numberOfgetDayFromBkendLastSun = this.getDayFromBkend;
      this.travelPeriodLimit = posts.productSetting['travelPeriodLimit'];
      this.clickAddedTotalNum = this.travelPeriodLimit + this.getDayFromBkend + 10;

    });
  }

  toDeterminedIfDisabledDaysNeedToHide() {
    const d = new Date(this.firstMon);
    d.setDate(d.getDate() - d.getDay());
    if (new Date(this.firstMon) > d) {
      this.firstWeekLastDay = '';
    } else {
      this.firstWeekLastDay = d.getFullYear() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString();
    }
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 0); // adjust when day is sunday
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
    console.log(value);
    this.changeTheIcon = value;
    if (value) {
      document.getElementById('brandListName').style.display = 'inline-block';
    } else {
      document.getElementById('brandListName').style.display = 'none';
    }
  }

  closeUl(val) {
    this.changeTheIcon = val;
    document.getElementById('brandListName').style.display = 'none';
  }

  openUl() {
    document.getElementById('brandListName').style.display = 'inline-block';
  }

  toAddLiVal(val) {
    this.brandList.forEach((item)=>{
      if(item.value == val){
        this.selectBrandTxt = item.name;
      }
    });
    this.selectedBrand = val;
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

  toHiddenDate(value) {
    if (this.startTravelDay) {
      const oneDay = 24 * 60 * 60 * 1000;
      const nextMonthLastDay = new Date(new Date(this.startTravelDay).getFullYear(), new Date(this.startTravelDay).getMonth() + this.theTimeClicked, 0);
      let startDayPlusLastDayNum = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit);
      const toGetLastWeekend = function () {
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

      if (this.theTimeClicked === this.totalTimesTimes) {
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
      const yesterday = new Date().setDate(new Date(this.getMonday(new Date())).getDate() - 1);
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
    this.numberOfgetDayFromBkendLastSun = this.getDayFromBkend;
    this.startTravelDay = '';
    this.endTravelDay = '';
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
    const startDaysDisabled = new Date(this.startTravelDay);
    const buttonDate = new Date(calVal);
    const todayPlusStartDayLimitAndDisaster = new Date().setDate(new Date().getDate() + this.startDayLimit);
    const startDayPlusLimitedDay = new Date(this.startTravelDay).setDate(new Date(this.startTravelDay).getDate() + this.travelPeriodLimit - 1);

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
  }

  onClickMe($event, classValueBtn, numberBtn, value) {
    let userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPhone/i)) {
      document.getElementById('calendarTable').style.display = 'none';
      document.getElementById('calendarTable').style.display = 'block';
    }

    if (this.startTravelDay) {
      console.log('startDay', this.startTravelDay);
      console.log('value', value);

      if (this.startTravelDay === value) {
        let modal = document.getElementById('myModal');
        modal.style.display = 'block';
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('出發日、返回日不可為同一天');
        document.querySelector('#myModal').scrollIntoView();
        return false;
      }
    }
    if (this.selectTravelDayIsDone === false && !this.startTravelDay) {
        this.textOfSelectingDays = '請點選旅程出發日與返回日';
        this.startTravelDay = $event.target.value;
        this.firstMon = new Date(this.startTravelDay);
        this.theDayBeginingNeedToRun = this.clickAddedTotalNum;
        this.totalTimesTimes = Math.round(this.travelPeriodLimit / 30);
        this.selectTravelDayIsDone = true;
        this.toShowMoreDays = true;
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
      if (this.startTravelDay) {
          if (this.startTravelDay === $event.target.value) {
            let modal = document.getElementById('myModal');
            modal.style.display = 'block';
            this.dataService.AlertTXT = [];
            this.dataService.AlertTXT.push('出發日、返回日不可為同一天');
            document.querySelector('#myModal').scrollIntoView();
            return false;
          } else {
            let sendDataBak = {};
            sendDataBak['product'] = 'Travel';
            sendDataBak['pack'] = this.pakNum;
            sendDataBak['startDate'] = this.startTravelDay;
            this.endTravelDay = $event.target.value;

            if(!this.pkgCustomGo && this.startTravelDay && this.endTravelDay){
              this.dataService.ifOnlyStartDayOnly(sendDataBak).subscribe((item) => {
                console.log(item);
                this.cusPackageList = item['cusPackageList'];
                this.packageList = item['packageList'];

                item.cusPackageList.filter(val => val.isDefaultPackage === true).map(
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
                  let objBack = {};
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
            if (this.startTravelDay && this.endTravelDay) {

            document.querySelector('#flagFive').scrollIntoView({block: 'start', behavior: 'smooth'});
            this.textOfSelectingDays = '您的旅遊期間';
            this.tableShowHidden = true;
            let oneDay = 24*60*60*1000;
            let firstDate = new Date(this.startTravelDay);
            let secondDate = new Date(this.endTravelDay);
            console.log(firstDate);
            console.log(secondDate);
              let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
              this.diffDays = diffDays;
              if(this.pkgCustomGo === false){
                  this.getPriceServiceData();
              } else {
                  this.toGetCusPkgPrice();
              }
            }
          }
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
          item['pictureCode'] == 'C_ITEM_MEDICAL'
      ){
        item['pictureCode'] = 'ITEM_MEDICAL_BILL'
      }
      if(item['pictureCode'] == 'ITEM_INCONVENIENT'){
        item['pictureCode'] = 'TAK002'
      }
      if(item['pictureCode'] == 'ITEM_SUDDEN_SICK'){
        item['pictureCode'] = 'TAK006'
      }
      if(item['pictureCode'] == 'C_DETAIL_RESCUE'){
        item['pictureCode'] = 'TAK009'
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
}
