import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { DataServiceService } from '../../services/data-service.service';
import { MemberCreateComponent } from '../../components/member-create/member-create.component'
import { ActivatedRoute } from '@angular/router';
import {count} from "rxjs/operator/count";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-add-member',
  templateUrl: 'add-member.component.html',
  styleUrls: ['add-member.component.css']
})

export class AddMemberComponent implements OnInit {
  birthdayYears: any[] = [];
  birthdayMonths: any[] = [];
  birthdayDays: any[] = [];
  relationShip: any[] = [];
  rateInfoList: any[] = [];
  lockFirstCard: boolean = true;
  insuredLimitedAge: number = 0;
  insuredMinAge: any;
  insuredMaxAge: any;
  countBrthDayFromSelectedBtn: any;

  Relationship: any = {};

  constructor(
      private shareService:ShareService,
      private dataService:DataServiceService,
      private memberCom: MemberCreateComponent,
      private routerAct: ActivatedRoute
  ) {
    this.birthdayMonths = this.birthMonths();
    this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.firstBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.secondBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.thirdBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.fourthBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.fifthBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.sixthBdayArr = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
  }

  toGetDataFromUrl(url) {
    var queryStart = url.indexOf('?') + 1;
    var queryEnd = url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    return query;
  };

  kanTrelationShip: any[];
  insuredList: any[];

  ngOnInit() {
    var Url = window.location.href;
    // var turnBakUrl = this.toGetDataFromUrl(Url);
    document.getElementById('addInsuredAdd').scrollIntoView({block: 'start', behavior: 'smooth'});

    this.dataService.toGetInsuredInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
      if(item){
        console.log(item);
        this.relationShip = item.relationList;
        this.rateInfoList = item.rateInfoList;
        console.log('insuredAgeMax', item.companySetting['insuredAgeMax']);
        console.log('insuredAgeMin', item.companySetting['insuredAgeMin']);

        this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
        this.insuredMaxAge = item.companySetting['insuredAgeMax'];
        this.insuredMinAge = item.companySetting['insuredAgeMin'];
        this.countBrthDayFromSelectedBtn = item['travelStartDate'];
        this.birthYears();
      }
    });

    if(this.dataService.backFromConfirm){
      setTimeout(() => {
        if(!this.dataService.noGoWithYourFdsFlag){
          this.firstCardRelationship = '本人';
          this.changedRelationship('', '');
        }else{
          this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
            this.insuredList = item['insuredList'];
            this.insuredList.forEach((item, index)=>{
              switch(index){
                case 0:
                  this.firstCardRelationship = item['relation'];
                  this.changedRelationship('', '');
                  this.firstCardLastName = item['lastName'];
                  this.firstCardFirstName = item['firstName'];
                  this.firstCardPid = item['pid'];
                  this.firstCardYear = item['birthday'].slice(0, 4);
                  this.firstCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.firstCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(1);
                  break;
                case 1:
                  this.secondCardRelationship = item['relation'];
                  this.secondCardLastName = item['lastName'];
                  this.secondCardFirstName = item['firstName'];
                  this.secondCardPid = item['pid'];
                  this.secondCardYear = item['birthday'].slice(0, 4);
                  this.secondCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.secondCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(2);
                  this.secondCardLock = true;
                  break;
                case 2:
                  this.thirdCardRelationship = item['relation'];
                  this.thirdCardLastName = item['lastName'];
                  this.thirdCardFirstName = item['firstName'];
                  this.thirdCardPid = item['pid'];
                  this.thirdCardYear = item['birthday'].slice(0, 4);
                  this.thirdCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.thirdCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(3);
                  this.thirdCardLock = true;
                  break;
                case 3:
                  this.fourthCardRelationship = item['relation'];
                  this.fourthCardLastName = item['lastName'];
                  this.fourthCardFirstName = item['firstName'];
                  this.fourthCardPid = item['pid'];
                  this.fourthCardYear = item['birthday'].slice(0, 4);
                  this.fourthCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.fourthCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(4);
                  this.fourthCardLock = true;
                  break;
                case 4:
                  this.fifthCardRelationship = item['relation'];
                  this.fifthCardLastName = item['lastName'];
                  this.fifthCardFirstName = item['firstName'];
                  this.fifthCardPid = item['pid'];
                  this.fifthCardYear = item['birthday'].slice(0, 4);
                  this.fifthCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.fifthCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(5);
                  this.fifthCardLock = true;
                  break;
                case 5:
                  this.sixthCardRelationship = item['relation'];
                  this.sixthCardLastName = item['lastName'];
                  this.sixthCardFirstName = item['firstName'];
                  this.sixthCardPid = item['pid'];
                  this.sixthCardYear = item['birthday'].slice(0, 4);
                  this.sixthCardMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                  this.sixthCardDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                  this.checkRatioAmt(6);
                  this.sixthCardLock = true;
                  break;
                default:
              }
            })
          });
        }
      }, 300);
    }

    this.changedRelationship('', '');
  }

  checkPidByClick(idValue, index){
    let value = idValue.toUpperCase();
    this.checkDisable('');

    switch(index){
      case 1:
        if(this.pidCheck(value)){
          this.firstPidTypeWrong = true;
          this.firstPidWrongWords = '身份證格式錯誤。';
          // if(value == this.secondCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
          //   this.firstPidTypeWrong = true;
          //   this.firstPidWrongWords = '身份證不可重複。';
          //   this.firstPidEmpty = false;
          // }else{
          //   this.firstPidTypeWrong = false;
          // }
        }else{
          if(value == this.secondCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
            this.firstPidTypeWrong = true;
            this.firstPidWrongWords = '身份證不可重複。';
            this.firstPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      case 2:
        if(this.pidCheck(value)){
          this.secondPidTypeWrong = true;
          this.secondPidWrongWords = '身份證格式錯誤。';
          // if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
          //   this.secondPidTypeWrong = true;
          //   this.secondPidWrongWords = '身份證不可重複。';
          //   this.secondPidEmpty = false;
          // }else{
          //   this.secondPidTypeWrong = false;
          // }
        }else{
          if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
            this.secondPidTypeWrong = true;
            this.secondPidWrongWords = '身份證不可重複。';
            this.secondPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      case 3:
        if(this.pidCheck(value)){
          this.thirdPidTypeWrong = true;
          this.thirdPidWrongWords = '身份證格式錯誤。';
        }else{
          if(value == this.firstCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
            this.thirdPidTypeWrong = true;
            this.thirdPidWrongWords = '身份證不可重複。';
            this.thirdPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      case 4:
        if(this.pidCheck(value)){
          this.fourthPidTypeWrong = true;
          this.fourthPidWrongWords = '身份證格式錯誤。';
        }else{
          if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
            this.fourthPidTypeWrong = true;
            this.fourthPidWrongWords = '身份證不可重複。';
            this.fourthPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      case 5:
        if(this.pidCheck(value)){
          this.fifthPidTypeWrong = true;
          this.fifthPidWrongWords = '身份證格式錯誤。';
          // if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
          //   this.fifthPidTypeWrong = true;
          //   this.fifthPidWrongWords = '身份證不可重複。';
          //   this.fifthPidEmpty = false;
          // }else{
          //   this.fifthPidTypeWrong = false;
          // }
        }else{
          if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
            this.fifthPidTypeWrong = true;
            this.fifthPidWrongWords = '身份證不可重複。';
            this.fifthPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      case 6:
        if(this.pidCheck(value)){
          this.sixthPidTypeWrong = true;
          this.sixthPidWrongWords = '身份證格式錯誤。';
          // if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.sixthCardPid.toUpperCase()){
          //   this.sixthPidTypeWrong = true;
          //   this.sixthPidWrongWords = '身份證不可重複。';
          //   this.sixthPidEmpty = false;
          // }else{
          //   this.sixthPidTypeWrong = false;
          // }
        }else{
          if(value == this.firstCardPid.toUpperCase() || value == this.thirdCardPid.toUpperCase() || value == this.fourthCardPid.toUpperCase() || value == this.fifthCardPid.toUpperCase() || value == this.secondCardPid.toUpperCase()){
            this.sixthPidTypeWrong = true;
            this.sixthPidWrongWords = '身份證不可重複。';
            this.sixthPidEmpty = false;
          }else{
            this.firstPidTypeWrong = false;
            this.secondPidTypeWrong = false;
            this.thirdPidTypeWrong = false;
            this.fourthPidTypeWrong = false;
            this.fifthPidTypeWrong = false;
            this.sixthPidTypeWrong = false;
          }
        }
        break;
      default:

    }
  }

  theTopAfterCheckRelate: string;
  relationShipChecked(value, index){
    if(!value && index == 3){
      this.theTopAfterCheckRelate = '44%';
      this.thirdRelationshipInvalid = true;
    }else{
      this.theTopAfterCheckRelate = '56%';
      this.thirdRelationshipInvalid = false;
    }
  }

  checkRelationShipRepeat(value, index){
    this.checkDisable('');
    let relationArr = [];
    let returnVal;
    relationArr.push(this.firstCardRelationship);
    relationArr.push(this.secondCardRelationship);
    relationArr.push(this.thirdCardRelationship);
    relationArr.push(this.fourthCardRelationship);
    relationArr.push(this.fifthCardRelationship);
    relationArr.push(this.sixthCardRelationship);
    this.kanTrelationShip = relationArr;
    let numberCnt = 0;
    function countInArray(array, what) {
      var count = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
          count++;
        }
      }
      return count;
    }

    switch(index){
      case 1:
        var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.firstRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
         break;
      case 2:
        var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.secondRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
         break;
      case 3:
        var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.thirdRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
        break;
      case 4:
        var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.fourthRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
        break;
      case 5:
          var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.fifthRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
        break;
      case 6:
        var ans = this.relationShip.map((x)=>{
          numberCnt = countInArray(this.kanTrelationShip, x['value']);
          if(numberCnt > x['allowedCnt']){
            this.sixthRelatedRepeat = true;
            return true;
          }else{
            return false;
          }
        });
        var checkAgainTimes = countInArray(ans, true);
        if(checkAgainTimes == 0){
          this.firstRelatedRepeat = false;
          this.secondRelatedRepeat = false;
          this.thirdRelatedRepeat = false;
          this.fourthRelatedRepeat = false;
          this.fifthRelatedRepeat = false;
          this.sixthRelatedRepeat = false;
        }
        break;
      default:
    }
  }

  pidCheck(userid:string){
    if(userid){
      var tab = 'ABCDEFGHJKLMNPQRSTUVXYWZIO',
          A1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
          A2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
          Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
      if (userid.length != 10) return true;
      var i = tab.indexOf(userid.toUpperCase().charAt(0));
      if (i == -1) return true;
      var sum = A1[i] + A2[i] * 9;
      for (i = 1; i < 10; i++) {
        var v = parseInt(userid.charAt(i));
        if (isNaN(v)) return true;
        sum = sum + v * Mx[i];
      }
      if (sum % 10 != 0) return true;
      return false;
    } else {
      return true;
    }
  }

  checkChineseName(value){
    if(value){
      if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
        return false;
      } else {
        return true;
      }
    }
  }
  secondCardLock: any;
  thirdCardLock: any;
  fourthCardLock: any;
  fifthCardLock: any;
  sixthCardLock: any;

  checkDisable(flagVal){
    if(flagVal == 'last' && this.firstCardLastName == ''){
      this.firstLastNameValiFail = true;
    }else if(flagVal == 'first' && this.firstCardFirstName == ''){
      this.firstFirstNameValiFail = true;
    }
    if(
        this.secondCardFirstName &&
        this.secondCardLastName &&
        !this.secondPidTypeWrong &&
        this.secondCardYear &&
        this.secondCardMonth &&
        this.secondCardDay
    ){
      this.thirdCardLock = true;
    }else{
      if(this.thirdCardLock){

      }else{
        this.thirdCardLock = false;
      }
    }
    if(
        this.thirdCardFirstName !== '' &&
        this.thirdCardLastName !== '' &&
        !this.thirdPidTypeWrong &&
        this.thirdCardYear !== '' &&
        this.thirdCardMonth !== '' &&
        this.thirdCardDay !== ''
    ){
      this.fourthCardLock = true;
    }else{
      if(this.fourthCardLock){

      }else{
        this.fourthCardLock = false;
      }
    }
    if(
        this.fourthCardFirstName &&
        this.fourthCardLastName &&
        !this.fourthPidTypeWrong &&
        this.fourthCardYear &&
        this.fourthCardMonth &&
        this.fourthCardDay
    ){
      this.fifthCardLock = true;
    }else{
      if(this.fifthCardLock){

      }else{
        this.fifthCardLock = false;
      }
    }

    if(
        this.fifthCardFirstName &&
        this.fifthCardLastName &&
        !this.fifthPidTypeWrong &&
        this.fifthCardYear &&
        this.fifthCardMonth &&
        this.fifthCardDay
    ){
      this.sixthCardLock = true;
    }else{
      if(this.sixthCardLock){

      }else{
        this.sixthCardLock = false;
      }
        }
  }

  owlAnanTwo() {
    this.checkOkReadyToSubmit();
    if(this.dataService.clearData == false){
      this.firstCardLastName = this.memberCom.lastName;
      this.firstCardFirstName = this.memberCom.firstName;
      this.firstCardPid = this.memberCom.pid
      this.firstCardYear = this.memberCom.pBirthYear.slice(0, 4);
      this.firstCardMonth = this.memberCom.pBirthMonth;
      this.firstCardDay = this.memberCom.pBirthDay;
      this.checkRatioAmt(1);
      this.countFinalPrice();
    }else{
      this.checkRatioAmt(1);
      this.countFinalPrice();
    }
    if(this.dataService.owlAnanOne){
      this.toInitData(2);
    }
    return this.dataService.owlAnanOne;
  }
  owlAnanThree() {
    if(this.dataService.owlAnanTwo){
      this.toInitData(3);
    }
    return this.dataService.owlAnanTwo;
  }
  owlAnanFour() {
    if(this.dataService.owlAnanThree){
      this.toInitData(4)
;    }
    return this.dataService.owlAnanThree;
  }
  owlAnanFifth() {
    if(this.dataService.owlAnanFour){
      this.toInitData(5);
    }
    return this.dataService.owlAnanFour;
  }
  owlAnanSixth() {
    if(this.dataService.owlAnanFifth){
      this.toInitData(6);
    }
    return this.dataService.owlAnanFifth;
  }

  changedRelationship(value, index) {
    if(index == 1){
      this.checkRelationShipRepeat(value, 1);
    }

    if(this.firstCardRelationship == '本人') {
      this.lockFirstCard = true;
      this.dataService.clearData = false;
      this.Data();
    } else {
      this.dataService.clearData = true;
      this.lockFirstCard = false;
      this.firstCardInsuredPriceWord = '0';
      this.Data();
    }
  }

  Data() {
    if(this.dataService.clearData == true){
      this.toInitData(1);
    } else {
      this.firstCardLastName = this.memberCom.lastName;
      this.firstCardFirstName = this.memberCom.firstName;
      this.firstCardPid = this.memberCom.pid
      this.firstCardYear = this.memberCom.pBirthYear.slice(0, 4);
      this.firstCardMonth = this.memberCom.pBirthMonth;
      this.firstCardDay = this.memberCom.pBirthDay;
      this.firstRelationshipInvalid = false;
      this.firstCardValidFail = false;
      this.firstBdOverAge = false;
      this.firstPidTypeWrong = false;
      this.firstCardCheckOk = false;
      this.firstFirstNameValiFail = false;
      this.firstLastNameValiFail = false;
      this.firstBdEmpty = false;
      this.firstPidEmpty = false;
    }
  }

  birthYears() {
    var date = new Date();
    let limitAge = date.getFullYear() - this.insuredMinAge;
    console.log('7', this.insuredMinAge);
    console.log('8', this.insuredLimitedAge);
    var returnVal = [];
    returnVal.push(limitAge);
    for (var i = 0; i <= (this.insuredLimitedAge+1); i++) {
      if(i < (this.insuredLimitedAge+1)){
        limitAge--;
        returnVal.push(limitAge);
      } else {
        this.birthdayYears = returnVal;
      }
    }
  }

  birthMonths() {
    var months = [];
    for (var i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  }

  checkBirthday(year, month, day){

  }

  birthDays(year, month) {
    var m = parseInt(month.toString().slice(0, 2));
    var y = parseInt(year.toString().slice(2, 6));
    var returnArr = [];
    switch (m) {
      case 1: case 3: case 5: case 7: case 8:case 10: case 12:
      for(let i = 1; i <= 31; i++){
        returnArr.push(i);
      }
      return returnArr;
      case 2:
        if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
          for(let i = 1; i <= 29; i++){
            returnArr.push(i);
          }
          return returnArr;
        } else {
          for(let i = 1; i <= 28; i++){
            returnArr.push(i);
          }
          return returnArr;
        }
      default:
        for(let i = 1; i <= 30; i++){
          returnArr.push(i);
        }
        return returnArr;
    }
  }

  calculate_age(birth_month,birth_day,birth_year)
  {
    let today_date = new Date(this.countBrthDayFromSelectedBtn);
    console.log(today_date);
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
      age--;
    }
    return age;
  }

  checkRatioAmt(index){
    this.checkDisable('');
    let currentYear = new Date(this.countBrthDayFromSelectedBtn).getFullYear();
    let currentMonth = new Date(this.countBrthDayFromSelectedBtn).getMonth() + 1;
    let currentDay = new Date(this.countBrthDayFromSelectedBtn).getDate();

    switch(index){
      case 1:
      if(this.firstCardYear && this.firstCardMonth){
        this.firstBdayArr = this.birthDays(this.firstCardYear, this.firstCardMonth);
      }
      if(this.firstCardYear && this.firstCardMonth && this.firstCardDay){
        console.log('1',this.firstCardYear);
        console.log('2',this.firstCardMonth);
        console.log('3',this.firstCardDay);
        var userAge = this.calculate_age(this.firstCardMonth, this.firstCardDay, this.firstCardYear);
        console.log('userAgecal', userAge);
        console.log('max',this.insuredMaxAge);
        console.log('min',this.insuredMinAge);

        if(userAge > this.insuredMaxAge || userAge < this.insuredMinAge){
          this.firstBdOverAge = true;
        }else{
          this.firstBdOverAge = false;
        }

        if(this.firstCardYear <  (currentYear - this.insuredMinAge) && this.secondCardYear > (currentYear - (this.insuredLimitedAge+1))){
          this.firstBdOverAge = false;
        }

        console.log('userage1', userAge);

        this.rateInfoList.forEach((item) => {
          console.log('ageMin', item.ageMin);
          console.log('ageMax', item.ageMax);
          if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
            this.firstCardInsuredPriceWord = this.numberWithCommas(item.rate);
            this.firstCardInsuredPrice = item.rate;
            this.firstCardWarningWord = item.tipText;
            this.memberCom.finalPrice();
          }
        });
      } else if (!this.firstCardYear && !this.firstCardMonth && !this.firstCardDay) {
      }
      break;

      case 2:
        if(this.secondCardYear && this.secondCardMonth){
          this.secondBdayArr = this.birthDays(this.secondCardYear, this.secondCardMonth);
        }
        if(this.secondCardYear && this.secondCardMonth && this.secondCardDay){

          var userAge = this.calculate_age(this.secondCardMonth, this.secondCardDay, this.secondCardYear);

          console.log('max',this.insuredMaxAge);
          console.log('min',this.insuredMinAge);

          if(userAge > this.insuredMaxAge || userAge < this.insuredMinAge){
            this.secondBdOverAge = true;
          }else{
            this.secondBdOverAge = false;
          }

          if(this.secondCardYear <  (currentYear - this.insuredMinAge) && this.secondCardYear > (currentYear - (this.insuredLimitedAge+1))){
            this.secondBdOverAge = false;
          }

          console.log('userage2', userAge);

          this.rateInfoList.forEach((item) => {
            console.log('ageMin', item.ageMin);
            console.log('ageMax', item.ageMax);
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
              this.secondCardInsuredPriceWord = this.numberWithCommas(item.rate);
              this.secondCardInsuredPrice = item.rate;
                this.secondCardWarningWord = item.tipText;
                this.memberCom.finalPrice();
            }
          });
        } else if (!this.secondCardYear && !this.secondCardMonth && !this.secondCardDay) {
        }
        break;

      case 3:
        if(this.thirdCardYear && this.thirdCardMonth){
          this.thirdBdayArr = this.birthDays(this.thirdCardYear, this.thirdCardMonth);
        }
        if(this.thirdCardYear && this.thirdCardMonth && this.thirdCardDay){

          var userAge = this.calculate_age(this.thirdCardMonth, this.thirdCardDay, this.thirdCardYear);

          if(userAge > this.insuredMaxAge || userAge < this.insuredMinAge){
            this.thirdBdOverAge = true;
          }else{
            this.thirdBdOverAge = false;
          }

          if(this.thirdCardYear <  (currentYear - this.insuredMinAge) && this.thirdCardYear > (currentYear - (this.insuredLimitedAge+1))){
            this.thirdBdOverAge = false;
          }

          console.log('userage3', userAge);

          this.rateInfoList.forEach((item) => {
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
              this.thirdCardInsuredPriceWord = this.numberWithCommas(item.rate);
              this.thirdCardInsuredPrice = item.rate;
                this.thirdCardWarningWord = item.tipText;
              this.memberCom.finalPrice();
            }
          });
        } else if (!this.thirdCardYear && !this.thirdCardMonth && !this.thirdCardDay) {
        }
        break;

      case 4:
        if(this.fourthCardYear && this.fourthCardMonth){
          this.fourthBdayArr = this.birthDays(this.fourthCardYear, this.fourthCardMonth);
        }
        if(this.fourthCardYear && this.fourthCardMonth && this.fourthCardDay){

          var userAge = this.calculate_age(this.fourthCardMonth, this.fourthCardDay, this.fourthCardYear);

          if(userAge > this.insuredMaxAge || userAge < this.insuredMinAge){
            this.fourthBdOverAge = true;
          }else{
            this.fourthBdOverAge = false;
          }

          if(this.fourthCardYear <  (currentYear - this.insuredMinAge) && this.fourthCardYear > (currentYear - (this.insuredLimitedAge+1))){
            this.fourthBdOverAge = false;
          }

          console.log('userage4', userAge);

          this.rateInfoList.forEach((item) => {
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
              this.fourthCardInsuredPriceWord = this.numberWithCommas(item.rate);
              this.fourthCardInsuredPrice = item.rate;
                this.fourthCardWarningWord = item.tipText;
              this.memberCom.finalPrice();
            }
          });
        } else if (!this.fourthCardYear && !this.fourthCardMonth && !this.fourthCardDay) {
        }
        break;

      case 5:
        if(this.fifthCardYear && this.fifthCardMonth){
          this.fifthBdayArr = this.birthDays(this.fifthCardYear, this.fifthCardMonth);
        }
        if(this.fifthCardYear && this.fifthCardMonth && this.fifthCardDay){

          var userAge = this.calculate_age(this.fifthCardMonth, this.fifthCardDay, this.fifthCardYear);

          if(userAge > this.insuredMaxAge ||userAge < this.insuredMinAge){
            this.fifthBdOverAge = true;
          }else{
            this.fifthBdOverAge = false;
          }

          console.log('userage5', userAge);

          if(this.fifthCardYear <  (currentYear - this.insuredMinAge) && this.fifthCardYear > (currentYear - (this.insuredLimitedAge+1))){
            this.fifthBdOverAge = false;
          }

          this.rateInfoList.forEach((item) => {
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
                this.fifthCardInsuredPriceWord = this.numberWithCommas(item.rate);
                this.fifthCardInsuredPrice = item.rate;
                this.fifthCardWarningWord = item.tipText;
              this.memberCom.finalPrice();
            }
          });
        } else if (!this.fifthCardYear && !this.fifthCardMonth && !this.fifthCardDay) {
        }
        break;

      case 6:
        if(this.sixthCardYear && this.sixthCardMonth){
          this.sixthBdayArr = this.birthDays(this.sixthCardYear, this.sixthCardMonth);
        }
        if(this.sixthCardYear && this.sixthCardMonth && this.sixthCardDay){

          var userAge = this.calculate_age(this.sixthCardMonth, this.sixthCardDay, this.sixthCardYear);

          if(userAge > this.insuredMaxAge || userAge < this.insuredMinAge){
            this.sixthBdOverAge = true;
          }else{
            this.sixthBdOverAge = false;
          }

          if(this.sixthCardYear <  (currentYear - this.insuredMinAge) && this.sixthCardYear > (currentYear - (this.insuredLimitedAge+1))){
            this.sixthBdOverAge = false;
          }

          console.log('userage6', userAge);

          this.rateInfoList.forEach((item) => {
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
              this.sixthCardInsuredPriceWord = this.numberWithCommas(item.rate);
              this.sixthCardInsuredPrice = item.rate;
                this.sixthCardWarningWord = item.tipText;
              this.memberCom.finalPrice();
            }
          });
        } else if (!this.sixthCardYear && !this.sixthCardMonth && !this.sixthCardDay) {
        }
        break;

      default:

    }
  }

  checkOkReadyToSubmit(){
    if((this.memberCom.readyToSaveData)){
      this.memberCom.submitTimes++;
      this.dataService.SaveInsuredData['insuredList'] = [];
      // first-card
      if(this.dataService.owlAnanOne){
        if( !this.firstCardRelationship ||
            !this.firstCardLastName ||
            !this.firstCardFirstName ||
            !this.firstCardPid ||
            !this.firstCardYear ||
            !this.firstCardMonth ||
            !this.firstCardDay ||
            this.firstPidTypeWrong ||
            this.firstRelatedRepeat
        )
        {
          if(this.memberCom.submitTimes == 1){
            var body = $("html, body");
            body.stop().animate({scrollTop:1200}, 200, 'swing', function() {
            });
          }

          if(!this.firstCardRelationship) {
            this.firstRelationshipInvalid = true;
          }else{
            this.firstRelationshipInvalid = false;
          }
          if(!this.firstCardFirstName){
            this.firstFirstNameValiFail = true;
          } else {
            this.firstFirstNameValiFail = false;
          }
          if(!this.firstCardLastName){
            this.firstLastNameValiFail = true;
          } else {
            this.firstLastNameValiFail = false;
          }
          if(!this.firstCardPid || this.firstPidTypeWrong){
            this.firstPidEmpty = true;
            if(this.firstPidTypeWrong){
              this.firstPidTypeWrong = true;
            }else{
              this.firstPidTypeWrong = false;
            }
          } else {
            this.firstPidEmpty = false;
            this.firstPidTypeWrong = false;
          }
          if(
            !this.firstCardYear ||
            !this.firstCardMonth ||
            !this.firstCardDay
          ){
            this.firstBdEmpty = true;
          } else {
            this.firstBdEmpty = false
          }
          this.firstCardCheckOk = false;
        } else {
          this.firstRelationshipInvalid = false;
          this.firstLastNameValiFail = false;
          this.firstFirstNameValiFail = false;

          this.firstPidEmpty = false;
          this.firstPidTypeWrong = false;
          this.firstBdEmpty = false;
          this.firstRelatedRepeat = false;
          let returnObj = {};
          returnObj['relation'] = this.firstCardRelationship;
          returnObj['lastName'] = this.firstCardLastName;
          returnObj['firstName'] = this.firstCardFirstName;
          returnObj['pid'] = this.firstCardPid;
          returnObj['birthday'] = this.firstCardYear + '-' + (this.firstCardMonth.length == 1? '0'+this.firstCardMonth: this.firstCardMonth) + '-' + (this.firstCardDay.length == 1? '0'+ this.firstCardDay: this.firstCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.firstCardCheckOk = true;
        }
      }

      if(!this.dataService.owlAnanOne){
        if( !this.firstCardLastName ||
            !this.firstCardFirstName ||
            !this.firstCardPid ||
            !this.firstCardYear ||
            !this.firstCardMonth ||
            !this.firstCardDay ||
            this.firstPidTypeWrong ||
            this.firstRelatedRepeat
        )
        {
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1200}, 200, 'swing', function() {
            });
          }
          if(!this.firstCardRelationship) {
            this.firstRelationshipInvalid = true;
          }else{
            this.firstRelationshipInvalid = false;
          }
          if(!this.firstCardFirstName){
            this.firstFirstNameValiFail = true;
          } else {
            this.firstFirstNameValiFail = false;
          }
          if(!this.firstCardLastName){
            this.firstLastNameValiFail = true;
          } else {
            this.firstLastNameValiFail = false;
          }
          if(!this.firstCardPid || this.firstPidTypeWrong){
            this.firstPidEmpty = true;
            if(this.firstPidTypeWrong){
              this.firstPidTypeWrong = true;
              this.firstPidEmpty = false;
            }else{
              this.firstPidTypeWrong = false;
            }
          } else {
            this.firstPidEmpty = false;
            this.firstPidTypeWrong = false;
          }
          if(
              !this.firstCardYear ||
              !this.firstCardMonth ||
              !this.firstCardDay
          ){
            this.firstBdEmpty = true;
          } else {
            this.firstBdEmpty = false
          }
          this.firstCardCheckOk = false;
        } else {
          this.firstRelationshipInvalid = false;
          this.firstFirstNameValiFail = false;
          this.firstLastNameValiFail = false;
          this.firstPidEmpty = false;
          this.firstPidTypeWrong = false;
          this.firstRelatedRepeat = false;
          this.firstBdEmpty = false

          let returnObj = {};
          returnObj['relation'] = this.firstCardRelationship;
          returnObj['lastName'] = this.firstCardLastName;
          returnObj['firstName'] = this.firstCardFirstName;
          returnObj['pid'] = this.firstCardPid;
          returnObj['birthday'] = this.firstCardYear + '-' + (this.firstCardMonth.length == 1? '0'+this.firstCardMonth: this.firstCardMonth) + '-' + (this.firstCardDay.length == 1? '0'+ this.firstCardDay: this.firstCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.firstCardCheckOk = true;
        }
      }
      // second-card
      if(!this.dataService.owlAnanOne) {
        if(
            !this.secondCardRelationship ||
            !this.secondCardLastName ||
            !this.secondCardFirstName ||
            !this.secondCardPid ||
            !this.secondCardYear ||
            !this.secondCardMonth ||
            !this.secondCardDay ||
            this.secondPidTypeWrong ||
             this.secondRelatedRepeat
        ){
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1200}, 200, 'swing', function() {
            });
          }
          if(!this.secondCardRelationship) {
            this.secondRelationshipInvalid = true;
          }else{
            this.secondRelationshipInvalid = false;
          }

          if(!this.secondCardFirstName){
            this.secondFirstNameValiFail = true;
          } else {
            this.secondFirstNameValiFail = false;
          }

          if(!this.secondCardLastName){
            this.secondLastNameValiFail = true;
          } else {
            this.secondLastNameValiFail = false;
          }

          if(!this.secondCardPid || this.secondPidTypeWrong){
            this.secondPidEmpty = true;
            if(this.secondPidTypeWrong){
              this.secondPidTypeWrong = true;
              this.secondPidEmpty = false;
            }else{
              this.secondPidTypeWrong = false;
            }
          } else {
            this.secondPidEmpty = false;
            this.secondPidTypeWrong = false;
          }

          if(
            !this.secondCardYear ||
            !this.secondCardMonth ||
            !this.secondCardDay
          ) {
            this.secondBdEmpty = true;
          } else {
            this.secondBdEmpty = false;
          }

          this.secondCardCheckOk = false;
        } else {
          this.secondRelationshipInvalid = false;
          this.secondFirstNameValiFail = false;
          this.secondLastNameValiFail = false;
          this.secondPidTypeWrong = false;
          this.secondPidTypeWrong = false;
          this.secondBdEmpty = false;
          this.secondRelatedRepeat = false;
          let returnObj = {};
          returnObj['relation'] = this.secondCardRelationship;
          returnObj['lastName'] = this.secondCardLastName;
          returnObj['firstName'] = this.secondCardFirstName;
          returnObj['pid'] = this.secondCardPid;
          returnObj['birthday'] = this.secondCardYear + '-' + (this.secondCardMonth.length == 1? '0'+ this.secondCardMonth: this.secondCardMonth) + '-' + (this.secondCardDay.length == 1? '0'+ this.secondCardDay: this.secondCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.secondCardCheckOk = true;
        }
      }
      // third-card
      if(!this.dataService.owlAnanTwo && this.thirdCardLock){
        if(
            !this.thirdCardRelationship ||
            !this.thirdCardLastName ||
            !this.thirdCardFirstName ||
            !this.thirdCardPid ||
            !this.thirdCardYear ||
            !this.thirdCardMonth ||
            !this.thirdCardDay ||
            this.thirdPidTypeWrong||
            this.thirdRelatedRepeat
        ){
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1520}, 200, 'swing', function() {
            });
          }
          if(!this.thirdCardRelationship){
            this.thirdRelationshipInvalid = true;
          }else{
            this.thirdRelationshipInvalid = false;
          }
          if(!this.thirdCardLastName){
            this.thirdLastNameValiFail = true;
          } else {
            this.thirdLastNameValiFail = false;
          }
          if(!this.thirdCardFirstName){
            this.thirdFirstNameValiFail = true;
          } else {
            this.thirdFirstNameValiFail = false;
          }
          if(!this.thirdCardPid || this.thirdPidTypeWrong){
            this.thirdPidEmpty = true;
            if(this.thirdPidTypeWrong){
              this.thirdPidTypeWrong = true;
              this.thirdPidEmpty = false;
            }else{
              this.thirdPidTypeWrong = false;
            }
          } else {
            this.thirdPidEmpty = false;
            this.thirdPidTypeWrong = false;
          }
          if(
              !this.thirdCardYear ||
              !this.thirdCardMonth ||
              !this.thirdCardDay
          ){
            this.thirdBdEmpty = true;
          } else {
            this.thirdBdEmpty = false;
          }

          this.thirdCardCheckOk = false;
        } else {
          this.thirdRelationshipInvalid = false;
          this.thirdFirstNameValiFail = false;
          this.thirdLastNameValiFail = false;
          this.thirdPidTypeWrong = false;
          this.thirdBdEmpty = false;
          this.thirdPidEmpty = false;
          this.thirdRelatedRepeat = false;
            let returnObj = {};
            returnObj['relation'] = this.thirdCardRelationship;
            returnObj['lastName'] = this.thirdCardLastName;
            returnObj['firstName'] = this.thirdCardFirstName;
            returnObj['pid'] = this.thirdCardPid;
            returnObj['birthday'] = this.thirdCardYear + '-' + (this.thirdCardMonth.length == 1? '0'+this.thirdCardMonth: this.thirdCardMonth) + '-' + (this.thirdCardDay.length == 1? '0'+ this.thirdCardDay: this.thirdCardDay);
            this.dataService.SaveInsuredData['insuredList'].push(returnObj);
            this.thirdCardCheckOk = true;
        }
      }
      // fourth-card
      if(!this.dataService.owlAnanThree && this.fourthCardLock){
        if(
            !this.fourthCardRelationship ||
            !this.fourthCardLastName ||
            !this.fourthCardFirstName ||
            !this.fourthCardPid ||
            !this.fourthCardYear ||
            !this.fourthCardMonth ||
            !this.fourthCardDay ||
             this.fourthPidTypeWrong ||
             this.fourthRelatedRepeat
        ){
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1520}, 200, 'swing', function() {
            });
          }
          if(!this.fourthCardRelationship){
           this.fourthRelationshipInvalid = true;
          }else{
            this.fourthRelationshipInvalid = false;
          }
          if(!this.fourthCardLastName){
            this.fourthLastNameValiFail = true;
          }else{
            this.fourthLastNameValiFail = false;
          }
          if(!this.fourthCardFirstName){
            this.fourthFirstNameValiFail = true;
          }else{
            this.fourthFirstNameValiFail = false;
          }
          if(!this.fourthCardPid || this.fourthPidTypeWrong){
            this.fourthPidEmpty = true;
            if(this.fourthPidTypeWrong){
              this.fourthPidTypeWrong = true;
              this.fourthPidEmpty = false;
            }else{
              this.fourthPidTypeWrong = false;
            }
          }else{
            this.fourthPidEmpty = false;
            this.fourthPidTypeWrong = false;
          }
          if(
              !this.fourthCardYear ||
              !this.fourthCardMonth ||
              !this.fourthCardDay)
          {
              this.fourthBdEmpty = true;
          }else{
              this.fourthBdEmpty = false;
          }
          this.fourthCardCheckOk = false;
        } else {
          this.fourthRelationshipInvalid = false;
          this.fourthFirstNameValiFail = false;
          this.fourthLastNameValiFail = false;
          this.fourthPidTypeWrong = false;
          this.fourthPidEmpty = false;
          this.fourthBdEmpty = false;
          this.fourthRelatedRepeat = false;
          let returnObj = {};
          returnObj['relation'] = this.fourthCardRelationship;
          returnObj['lastName'] = this.fourthCardLastName;
          returnObj['firstName'] = this.fourthCardFirstName;
          returnObj['pid'] = this.fourthCardPid;
          returnObj['birthday'] = this.fourthCardYear + '-' + (this.fourthCardMonth.length == 1? '0'+this.fourthCardMonth: this.fourthCardMonth) + '-' + (this.fourthCardDay.length == 1? '0'+ this.fourthCardDay: this.fourthCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.fourthCardCheckOk = true;
        }
      }
      // fifth-card
      if(!this.dataService.owlAnanFour && this.fifthCardLock){
        if(
            !this.fifthCardRelationship ||
            !this.fifthCardLastName ||
            !this.fifthCardFirstName ||
            !this.fifthCardPid ||
            !this.fifthCardYear ||
            !this.fifthCardMonth ||
            !this.fifthCardDay ||
            this.fifthPidTypeWrong ||
            this.fifthRelatedRepeat
        ){
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1650}, 200, 'swing', function() {
            });
          }
          if(!this.fifthCardRelationship){
            this.fifthRelationshipInvalid = true;
          }else{
            this.fifthRelationshipInvalid = false;
          }
          if(!this.fifthCardLastName){
            this.fifthLastNameValiFail = true;
          }else{
            this.fifthLastNameValiFail = false;
          }
          if(!this.fifthCardFirstName){
            this.fifthFirstNameValiFail = true;
          }else{
            this.fifthFirstNameValiFail = false;
          }


          if(!this.fourthCardPid || this.fourthPidTypeWrong){
            this.fourthPidEmpty = true;
            if(this.fourthPidTypeWrong){
              this.fourthPidTypeWrong = true;
              this.fourthPidEmpty = false;
            }else{
              this.fourthPidTypeWrong = false;
            }
          }else{
            this.fourthPidEmpty = false;
            this.fourthPidTypeWrong = false;
          }

          if(!this.fifthCardPid || this.fifthPidTypeWrong){
            this.fifthPidEmpty = true;
            if(this.fifthPidTypeWrong){
              this.fifthPidTypeWrong = true;
              this.fifthPidEmpty = false;
            }else{
              this.fifthPidTypeWrong = false;
            }
          }else{
            this.fifthPidEmpty = false;
            this.fifthPidTypeWrong = false;
          }

          if(
            !this.fifthCardYear ||
            !this.fifthCardMonth ||
            !this.fifthCardDay
          ){
            this.fifthBdEmpty = true;
          }else{
            this.fifthBdEmpty = false;
          }
          this.fifthCardCheckOk = false;
        } else {
          this.fifthRelationshipInvalid = false;
          this.fifthLastNameValiFail = false;
          this.fifthFirstNameValiFail = false;
          this.fifthPidEmpty = false;
          this.fifthPidTypeWrong = false;
          this.fifthBdEmpty = false;
          this.fifthRelatedRepeat = false;
          let returnObj = {};
          returnObj['relation'] = this.fifthCardRelationship;
          returnObj['lastName'] = this.fifthCardLastName;
          returnObj['firstName'] = this.fifthCardFirstName;
          returnObj['pid'] = this.fifthCardPid;
          returnObj['birthday'] = this.fifthCardYear + '-' + (this.fifthCardMonth.length == 1? '0'+this.fifthCardMonth: this.fifthCardMonth) + '-' + (this.fifthCardDay.length == 1? '0'+ this.fifthCardDay: this.fifthCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.fifthCardCheckOk = true;
        }
      }
      // sixth-card
      if(!this.dataService.owlAnanFifth && this.sixthCardLock){
        if(
            !this.sixthCardRelationship ||
            !this.sixthCardLastName ||
            !this.sixthCardFirstName ||
            !this.sixthCardPid ||
            !this.sixthCardYear ||
            !this.sixthCardMonth ||
            !this.sixthCardDay ||
            this.sixthPidTypeWrong ||
            this.sixthRelatedRepeat
        ){
          if(this.memberCom.submitTimes == 1) {
            var body = $("html, body");
            body.stop().animate({scrollTop:1650}, 200, 'swing', function() {
            });
          }
          if(!this.sixthCardRelationship){
            this.sixthRelationshipInvalid = true;
          }else{
            this.sixthRelationshipInvalid = false;
          }
          if(!this.sixthCardLastName){
            this.sixthLastNameValidFail = true;
          }else{
            this.sixthLastNameValidFail = false;
          }

          if(!this.sixthCardFirstName){
            this.sixthFirstNameValidFail = true;
          }else{
            this.sixthFirstNameValidFail = false;
          }
          if(!this.sixthCardPid || this.sixthPidTypeWrong){
            this.sixthPidEmpty = true;
            if(this.sixthPidTypeWrong){
              this.sixthPidTypeWrong = true;
              this.sixthPidEmpty = false;
            }else{
              this.sixthPidTypeWrong = false;
            }
          }else{
            this.sixthPidEmpty = false;
            this.sixthPidTypeWrong = false;
          }
          if(!this.sixthCardYear ||
              !this.sixthCardMonth ||
              !this.sixthCardDay
          ){
            this.sixthBdEmpty = true;
          }else{
            this.sixthBdEmpty = false;
          }
          this.sixthCardCheckOk = false;
        } else {
          this.sixthRelationshipInvalid = false;
          this.sixthLastNameValidFail = false;
          this.sixthFirstNameValidFail = false;
          this.sixthPidTypeWrong = false;
          this.sixthPidEmpty = false;
          this.sixthBdEmpty = false;
          this.sixthRelatedRepeat = false;
          let returnObj = {};
          returnObj['relation'] = this.sixthCardRelationship;
          returnObj['lastName'] = this.sixthCardLastName;
          returnObj['firstName'] = this.sixthCardFirstName;
          returnObj['pid'] = this.sixthCardPid;
          returnObj['birthday'] = this.sixthCardYear + '-' + (this.sixthCardMonth.length == 1? '0'+this.sixthCardMonth: this.sixthCardMonth) + '-' + (this.sixthCardDay.length == 1? '0'+ this.sixthCardDay: this.sixthCardDay);
          this.dataService.SaveInsuredData['insuredList'].push(returnObj);
          this.sixthCardCheckOk = true;
        }
      }

      if(this.memberCom.submitTimes == 1){
        this.checkAllValidationOkay();
      }
    }
  }

  checkAllValidationOkay(){
    console.log('55555', this.dataService.owlAnanFifth);
    console.log('44444', this.dataService.owlAnanFour);
    console.log('33333', this.dataService.owlAnanThree);
    console.log('22222', this.dataService.owlAnanTwo);
    console.log('11111', this.dataService.owlAnanOne);

    if(
      this.dataService.owlAnanFifth &&
      this.dataService.owlAnanFour &&
      this.dataService.owlAnanThree &&
      this.dataService.owlAnanTwo &&
      this.dataService.owlAnanOne
    ){
      //驗證第一張卡
      if(this.firstCardCheckOk){
        //發送的一張
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        if(this.firstCardCheckOk){
          var modal = document.getElementById('myModal');
          modal.style.display = "block";
          this.dataService.AlertTXT = [];
          this.dataService.AlertTXT.push('請正確填寫被保險人資訊');
        }
      }
    }

    if(
        this.dataService.owlAnanFifth &&
        this.dataService.owlAnanFour &&
        this.dataService.owlAnanThree &&
        this.dataService.owlAnanTwo &&
        !this.dataService.owlAnanOne
    ){
      //驗證第一張卡和第二張卡
      if(this.firstCardCheckOk && this.secondCardCheckOk){
        //發送的一張和第二張卡
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資訊');      }
    }

    if(
        this.dataService.owlAnanFifth &&
        this.dataService.owlAnanFour &&
        this.dataService.owlAnanThree &&
        !this.dataService.owlAnanTwo &&
        !this.dataService.owlAnanOne
    ){
      //驗證第一張卡和第二張卡
      if(this.firstCardCheckOk && this.secondCardCheckOk && this.thirdCardCheckOk){
        //發送的一張和第二張卡
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資訊');      }
    }

    if(
        this.dataService.owlAnanFifth &&
        this.dataService.owlAnanFour &&
        !this.dataService.owlAnanThree &&
        !this.dataService.owlAnanTwo &&
        !this.dataService.owlAnanOne
    ){
      //驗證第一張卡和第二張卡
      if(this.firstCardCheckOk && this.secondCardCheckOk && this.thirdCardCheckOk && this.fourthCardCheckOk){
        //發送的一張和第二張卡
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資訊');      }
    }

    if(
        this.dataService.owlAnanFifth &&
        !this.dataService.owlAnanFour &&
        !this.dataService.owlAnanThree &&
        !this.dataService.owlAnanTwo &&
        !this.dataService.owlAnanOne
    ){
      //驗證第一張卡和第二張卡
      if(this.firstCardCheckOk && this.secondCardCheckOk && this.thirdCardCheckOk && this.fourthCardCheckOk && this.fifthCardCheckOk){
        //發送的一張和第二張卡
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資訊');      }
    }

    if(
        !this.dataService.owlAnanFifth &&
        !this.dataService.owlAnanFour &&
        !this.dataService.owlAnanThree &&
        !this.dataService.owlAnanTwo &&
        !this.dataService.owlAnanOne
    ){
      //驗證第一張卡和第二張卡
      if(this.firstCardCheckOk && this.secondCardCheckOk && this.thirdCardCheckOk && this.fourthCardCheckOk && this.fifthCardCheckOk && this.sixthCardCheckOk){
        //發送的一張和第二張卡
        this.dataService.toSaveInsuredData();
      } else {
        //驗證沒過
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資訊');      }
    }
  }

  numberWithCommas = (x) => {
    let Xn = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return Xn
  }

  finalPrice: any;
  countFinalPrice() {
    let price  = this.firstCardInsuredPrice +
    this.secondCardInsuredPrice +
    this.thirdCardInsuredPrice +
    this.fourthCardInsuredPrice +
    this.fifthCardInsuredPrice +
    this.sixthCardInsuredPrice;
    this.finalPrice = this.numberWithCommas(price);
  }

  toInitData(index) {
    switch(index) {
      case 1:
        this.firstCardLastName = '';
        this.firstCardFirstName = '';
        this.firstCardPid = '';
        this.firstCardYear = '';
        this.firstCardMonth = '';
        this.firstCardDay = '';
        this.firstCardInsuredPrice = 0;
        break;
      case 2:
        this.secondCardInsuredPrice = 0;
        this.secondCardRelationship = "";
        this.secondCardLastName = '';
        this.secondCardFirstName = '';
        this.secondCardPid = '';
        this.secondCardYear = '';
        this.secondCardMonth = '';
        this.secondCardDay  = '';
        break;
      case 3:
        this.thirdCardInsuredPrice = 0;
        this.thirdCardRelationship = "";
        this.thirdCardLastName = '';
        this.thirdCardFirstName = '';
        this.thirdCardPid = '';
        this.thirdCardYear = '';
        this.thirdCardMonth = '';
        this.thirdCardDay = '';
        break;
      case 4:
        this.fourthCardInsuredPrice = 0;
        this.fourthCardRelationship = "";
        this.fourthCardLastName = '';
        this.fourthCardFirstName = '';
        this.fourthCardPid = '';
        this.fourthCardYear  = '';
        this.fourthCardMonth = '';
        this.fourthCardDay = '';
        break;
      case 5:
        this.fifthCardInsuredPrice = 0;
        this.fifthCardRelationship = "";
        this.fifthCardLastName = '';
        this.fifthCardFirstName  = '';
        this.fifthCardPid = '';
        this.fifthCardYear = '';
        this.fifthCardMonth = '';
        this.fifthCardDay = '';
        break;
      case 6:
        this.sixthCardInsuredPrice = 0;
        this.sixthCardRelationship  = "";
        this.sixthCardLastName = '';
        this.sixthCardFirstName = '';
        this.sixthCardPid = '';
        this.sixthCardYear  = '';
        this.sixthCardMonth = '';
        this.sixthCardDay = '';
        break;
      default:
        break;
    }

  }

  // many many of dummpy variables starts from here!!
  // first card
  firstCardInsuredPriceWord:string = '0';
  firstCardInsuredPrice: number = 0;
  firstCardRelationship: any = "本人";
  firstCardLastName: string = '';
  firstCardFirstName: string = '';
  firstCardPid: string = '';
  firstCardYear: any = '';
  firstCardMonth: any = '';
  firstCardDay: any = '';
  firstRelationshipInvalid: boolean = false;
  firstBdOverAge: boolean = false;
  firstPidTypeWrong: boolean = false;
  firstCardCheckOk: boolean = false;
  firstCardValidFail: boolean = false;
  firstFirstNameValiFail: boolean = false;
  firstLastNameValiFail: boolean = false;
  firstBdEmpty: boolean = false;
  firstPidEmpty: boolean = false;
  firstRelatedRepeat: boolean = false;
  firstPidWrongWords: string = '身分證格式錯誤。';
  firstBdayArr: any;
  firstCardWarningWord: string;

  // second card
  secondCardInsuredPriceWord:string = '0'
  secondCardInsuredPrice: number = 0;
  secondCardRelationship: any = "";
  secondCardLastName: string = '';
  secondCardFirstName: string = '';
  secondCardPid: string = '';
  secondCardYear: any = '';
  secondCardMonth: any = '';
  secondCardDay: any = '';
  secondRelationshipInvalid: boolean = false;
  secondBdOverAge: boolean = false;
  secondPidTypeWrong: boolean = false;
  secondCardCheckOk: boolean = false;
  secondCardValidFail: boolean = false;
  secondFirstNameValiFail: boolean = false;
  secondLastNameValiFail: boolean = false;
  secondBdEmpty: boolean = false;
  secondPidEmpty: boolean = false;
  secondRelatedRepeat: boolean = false;
  secondPidWrongWords: string = '身分證格式錯誤。';
  secondBdayArr: any;
  secondCardWarningWord: string;

  // third card
  thirdCardInsuredPriceWord:string = '0';
  thirdCardInsuredPrice: number = 0;
  thirdCardRelationship: any = "";
  thirdCardLastName: string = '';
  thirdCardFirstName: string = '';
  thirdCardPid: string = '';
  thirdCardYear: any = '';
  thirdCardMonth: any = '';
  thirdCardDay: any = '';
  thirdRelationshipInvalid: boolean = false;
  thirdBdOverAge: boolean = false;
  thirdPidTypeWrong: boolean = false;
  thirdCardCheckOk: boolean = false;
  thirdCardValidFail: boolean = false;
  thirdLastNameValiFail: boolean = false;
  thirdFirstNameValiFail: boolean = false;
  thirdBdEmpty: boolean = false;
  thirdPidEmpty: boolean = false;
  thirdRelatedRepeat: boolean = false;
  thirdPidWrongWords: string = '身分證格式錯誤。';
  thirdBdayArr: any;
  thirdCardWarningWord: string;

  // fourth card
  fourthCardInsuredPriceWord:string = '0';
  fourthCardInsuredPrice: number = 0;
  fourthCardRelationship: any = "";
  fourthCardLastName: string = '';
  fourthCardFirstName: string = '';
  fourthCardPid: string = '';
  fourthCardYear: any = '';
  fourthCardMonth: any = '';
  fourthCardDay: any = '';
  fourthRelationshipInvalid: boolean = false;
  fourthBdOverAge: boolean = false;
  fourthPidTypeWrong: boolean = false;
  fourthCardCheckOk: boolean = false;
  fourthCardValidFail: boolean = false;
  fourthLastNameValiFail: boolean = false;
  fourthFirstNameValiFail: boolean = false;
  fourthBdEmpty: boolean = false;
  fourthPidEmpty: boolean = false;
  fourthRelatedRepeat: boolean = false;
  fourthPidWrongWords: string = '身分證格式錯誤。';
  fourthBdayArr: any;
  fourthCardWarningWord: string;

  // fifth card
  fifthCardInsuredPriceWord:string = '0';
  fifthCardInsuredPrice: number = 0;
  fifthCardRelationship: any = "";
  fifthCardLastName: string = '';
  fifthCardFirstName: string = '';
  fifthCardPid: string = '';
  fifthCardYear: any = '';
  fifthCardMonth: any = '';
  fifthCardDay: any = '';
  fifthRelationshipInvalid: boolean = false;
  fifthBdOverAge: boolean = false;
  fifthPidTypeWrong: boolean = false;
  fifthCardCheckOk: boolean = false;
  fifthCardValidFail: boolean = false;
  fifthLastNameValiFail: boolean = false;
  fifthFirstNameValiFail: boolean = false;
  fifthBdEmpty: boolean = false;
  fifthPidEmpty: boolean = false;
  fifthRelatedRepeat: boolean = false;
  fifthPidWrongWords: string = '身分證格式錯誤。';
  fifthBdayArr: any;
  fifthCardWarningWord: string;

  // sixth card
  sixthCardInsuredPriceWord:string = '0';
  sixthCardInsuredPrice: number = 0;
  sixthCardRelationship: any = "";
  sixthCardLastName: string = '';
  sixthCardFirstName: string = '';
  sixthCardPid: string = '';
  sixthCardYear: any  = '';
  sixthCardMonth: any = '';
  sixthCardDay: any = '';
  sixthRelationshipInvalid: boolean = false;
  sixthBdOverAge: boolean = false;
  sixthPidTypeWrong: boolean = false;
  sixthCardCheckOk: boolean = false;
  sixthCardValidFail: boolean = false;
  sixthLastNameValidFail: boolean = false;
  sixthFirstNameValidFail: boolean = false;
  sixthBdEmpty: boolean = false;
  sixthPidEmpty: boolean = false;
  sixthRelatedRepeat: boolean = false;
  sixthPidWrongWords: string = '身分證格式錯誤。';
  sixthBdayArr: any;
  sixthCardWarningWord: string;

}