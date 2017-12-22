import {
  Component, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild,
  ElementRef } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { ShareService } from '../../services/share.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})

export class MemberCreateComponent implements OnInit {
  buttonOne: boolean = false;
  buttonTwo: boolean = false;
  buttonThree: boolean = false;
  insuredFinalPrice: any;
  public loading = false;

  checkEmailDis: boolean = false;
  checkLastNameDis: boolean = false;
  checkFirstNameDis: boolean = false;
  checkPidDis: boolean = false;
  checkBDay: boolean = false;

  owlAnanOne: boolean = true;
  owlAnanTwo: boolean = true;
  owlAnanThree: boolean = true;
  owlAnanFour: boolean = true;
  owlAnanFifth: boolean = true;

  birthdayYears: any[] = [];
  birthdayMonths: any[] = [];
  birthdayDays: any[] = [];
  cityList: any[] = [];
  relationship: any[] = [];
  selectedCity: any = '';
  noGoWithYourFds: boolean = true;
  toGoWithYourFdsClick: boolean = false;
  hiddenAtBegining: any = 'hide';
  email:any = '';
  lastName:string = '';
  firstName:string = '';
  pid:string = '';
  pBirthYear:any = '';
  pBirthMonth:any = '';
  pBirthDay:any = '';
  Mobile:string = '';
  selectedDistrict:any = '';
  areaZipCode:any = '';
  addr: string = '';
  areaList: any = [];
  filteredArea: any = [];
  aggreeToUpdate: boolean = true;
  aggreeToUpdateAlreadyRead: boolean = true;
  applicantSelectListYear: any[] = [];
  applicantAgeMax: number;
  applicantAgeMin: number;
  insuredLimitedAge: number;
  aggreementCompany: string = 'MingTai';
  hideUpinput: boolean = true;
  pdfUrl4Terms: string = '';
  insuredMinAge: any;
  relationShip: any[] = [];
  rateInfoList: any[] = [];
  insuredAgeMax: any;
  insuredAgeMin: any;

  applicantAloneLastName:string = '';
  applicantAloneFirstName:string = '';
  applicantAlonePid:string = '';
  applicantAloneBirthYear: any = '';
  applicantAloneBirthMonth: any = '';
  applicantAloneBirthDay: any = '';
  aloneBirthdayDays: any;
  aloneBdWrong: boolean = false;
  personalInfoSelect: any = '本人';
  applicantAloneLockInput: boolean = false;
  applicantAloneMinAge: any = 0;
  readyToSaveData: boolean = false;
  personalAgeOver: boolean = false;
  alonePidTypeWrong: boolean = false;
  submitTimes: number = 0;
  toRecheck: boolean = false;
  aloneNameLastChinese: boolean;
  aloneNameFirstChinese: boolean;
  insuredList: any;
  countAlertNum: number = 0;
  countBrthDayFromSelectedBtn:any;
  firstTimeClickHaoA: Boolean = false;
  aloneNameEmpty: boolean;
  alonePidWrong: boolean;
  aloneBdEmpty: boolean;
  btnClickToGoFds: boolean = false;
  ans:boolean;
  msgError:any;
  aloneWarningWord: string;

  @ViewChild('emailElm') EmailEl:ElementRef;
  @ViewChild('lastNameEl') lastNameEl:ElementRef;
  @ViewChild('firstNameEl') firstNameEl:ElementRef;
  @ViewChild('birthdayCityEl') birthdayCityEl:ElementRef;
  @ViewChild('MobileEl') mobileEl:ElementRef;
  @ViewChild('birthdayYAM') birthdayYAM:ElementRef;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private shareService: ShareService,
    private dataService: DataServiceService,
  ) {
    $('html, body').animate({scrollTop: '0px'}, 0);
     this.buttonOne = this.shareService.buttonOne;
     this.buttonTwo = this.shareService.buttonTwo;
     this.buttonThree = this.shareService.buttonThree;
  }

  checkAloneBd(){
    this.toRecheckAgain();
    let currentYear = new Date(this.countBrthDayFromSelectedBtn).getFullYear();
    let currentMonth = new Date(this.countBrthDayFromSelectedBtn).getMonth() + 1;
    let currentDay = new Date(this.countBrthDayFromSelectedBtn).getDate();
    if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth){
      this.aloneBirthdayDays =  this.birthDays(this.applicantAloneBirthYear, this.applicantAloneBirthMonth);
    }
    if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth && this.applicantAloneBirthDay){
      this.aloneBdEmpty = false;
      let userAge = currentYear - this.applicantAloneBirthYear;
      if((currentMonth >= this.applicantAloneBirthMonth) && (currentDay >= this.applicantAloneBirthDay)){
        //生日過今天 保留原本選擇年紀
      } else {
        userAge = userAge - 1;
        //未過今天 年紀扣一歲
      }
      if(this.insuredLimitedAge !== 0){
        if(this.applicantAloneBirthYear <= (currentYear - (this.insuredLimitedAge+1))){
          if((this.applicantAloneBirthMonth < currentMonth) && (this.applicantAloneBirthDay >= currentDay) || (this.applicantAloneBirthMonth <= currentMonth) && (this.applicantAloneBirthDay <= currentDay)){
            this.aloneBdWrong = true;
            console.log('12343214321', this.rateInfoList);
          } else {
            this.aloneBdWrong = false;
            this.rateInfoList.forEach((item) => {
              if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
                this.aloneWarningWord = item.tipText;
              }
            });
          }
        } else if(this.applicantAloneBirthYear >= (currentYear - this.insuredMinAge)){
          if((this.applicantAloneBirthMonth >= currentMonth) && (this.applicantAloneBirthDay >= currentDay) || (this.applicantAloneBirthMonth > currentMonth) && (this.applicantAloneBirthDay <= currentDay)){
            this.aloneBdWrong = true;
            console.log('12343214321', this.rateInfoList);

            console.log('3', userAge);
          } else {
            this.aloneBdWrong = false;
            console.log('4', userAge);
            this.rateInfoList.forEach((item) => {
              if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
                this.aloneWarningWord = item.tipText;
              }
            });
          }
        }
        if(this.applicantAloneBirthYear <  (currentYear - this.insuredMinAge) && this.applicantAloneBirthYear > (currentYear - (this.insuredLimitedAge+1))){
          this.aloneBdWrong = false;
          this.rateInfoList.forEach((item) => {
            if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
              this.aloneWarningWord = item.tipText;
            }
          });
        }

      }
    } else if (!this.applicantAloneBirthYear && !this.applicantAloneBirthMonth && !this.applicantAloneBirthDay) {
      this.aloneBdEmpty = true;
    }
  }

  emailChange(email){
  }

  changedData(year=null, month=null, day=null){
    this.userPidFail = this.pidCheck(this.pid);
    this.checkBirthday(year, month, day);
    this.dataService.clearData = false;
  }

  checkChineseName(value, id){
    this.toRecheckAgain();
    if(value){
      if(value && id == 'last'){
        if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
          this.aloneNameLastChinese = false;
        } else {
          this.aloneNameLastChinese = true;
        }
      } else if (value && id == 'first'){
        if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
          this.aloneNameFirstChinese = false;
        } else {
          this.aloneNameFirstChinese = true;
        }
      } else if (value || id == ''){
        if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
          return false;
        } else {
          return true;
        }
      }
    }else{
      // if(id == 'last'){
      //   this.aloneLastNameEmpty = true;
      //   this.aloneNameLastChinese = false;
      // }else{
      //   this.aloneFirstNameEmpty = true;
      //   this.aloneNameFirstChinese = false;
      // }
    }
  }

  toGoDownWindow(){
    this.dataService.toGoDown = true;
    try {
      sessionStorage.setItem('bak', JSON.stringify(true))
    } catch (e) {
    }
  }

  checkVal(){
    if(!this.applicantAloneLastName){
      this.aloneLastNameEmpty = true;
    }else{
      this.aloneLastNameEmpty = false;
    }

    if(!this.applicantAloneFirstName){
      this.aloneFirstNameEmpty = true;
    }else{
      this.aloneFirstNameEmpty = false;
    }

    if(!this.applicantAlonePid){
      this.alonePidEmpty = true;
    }else{
      this.alonePidEmpty = false;
    }

    if(this.alonePidTypeWrong){
      this.alonePidTypeWrong = true;
      this.alonePidEmpty = false;
    }else{
      this.alonePidTypeWrong = false;
    }

    if(
        !this.applicantAloneBirthYear ||
        !this.applicantAloneBirthMonth ||
        !this.applicantAloneBirthDay
    ){
      this.aloneBdEmpty = true;
    }else{
      this.aloneBdEmpty = false;
    }
  }

  personalSelectChange(){
    if(this.personalInfoSelect !== '本人') {
      // this.checkVal();
      this.applicantAloneLockInput = false;
      this.applicantAloneLastName = '';
      this.applicantAloneFirstName = '';
      this.applicantAlonePid = '';
      this.applicantAloneBirthYear = '';
      this.applicantAloneBirthMonth = '';
      this.applicantAloneBirthDay = '';
      this.aloneLastNameEmpty = false;
      this.aloneFirstNameEmpty = false;
      this.alonePidEmpty = false;
      this.alonePidTypeWrong = false;
      this.aloneBdEmpty = false;
      this.alonePidWrong = false;
      this.alonePidTypeWrong = false;
      this.aloneBdWrong = false;
      this.aloneNameFirstChinese = false;
      this.aloneNameLastChinese = false;
    } else {
      // this.checkVal();
      this.applicantAloneLockInput = true;
      this.applicantAloneLastName = this.lastName;
      this.applicantAloneFirstName = this.firstName;
      this.applicantAlonePid = this.pid;
      this.applicantAloneBirthYear = this.pBirthYear;
      this.applicantAloneBirthMonth = this.pBirthMonth;
      this.applicantAloneBirthDay = this.pBirthDay;

      this.aloneLastNameEmpty = false;
      this.aloneFirstNameEmpty = false;
      this.alonePidEmpty = false;
      this.alonePidTypeWrong = false;
      this.aloneBdEmpty = false;
      this.alonePidWrong = false;
      this.alonePidTypeWrong = false;
      this.aloneBdWrong = false;
      this.aloneNameFirstChinese = false;
      this.aloneNameLastChinese = false;
    }
  }

  addrCheck(addr){
    if(!addr){
      return true;
    } else {
      return false;
    }
  }

  toRecheckAgain(){
    if(this.toRecheck){
        this.checkVal();
    }
  }

  checkBirthday(year, month, day){
    if (!year && !month && !day) {

    } else if(year && month && day) {
      let personAge2 = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
      console.log(this.pBirthYear);
      console.log(this.pBirthMonth);
      console.log(this.pBirthDay);
      console.log('要保人2', personAge2);
      console.log('要保人最老要保年齡', this.applicantAgeMax);
      console.log('要保人最低年齡', this.applicantAgeMin);
      if(personAge2 > this.applicantAgeMax || personAge2 < this.applicantAgeMin){
        this.personalAgeOver = true;
      } else {
        this.personalAgeOver = false;

        //   let currentDay = new Date().getDate();
      //   let currentMonth = new Date().getMonth() + 1;
      //   let currentYear = new Date().getFullYear();
      //   let maxYear = new Date().getFullYear() - this.applicantAgeMax //old;
      //   let minYear = new Date().getFullYear() - this.applicantAgeMin //young;
      //   if (this.pBirthYear && this.pBirthMonth) {
      //     this.birthdayDays = this.birthDays(this.pBirthYear, this.pBirthMonth);
      //   }
      //   if (year == maxYear) {
      //     if ((this.pBirthYear <= maxYear && this.pBirthMonth <= currentMonth && this.pBirthDay <= currentDay)) {
      //       this.personalAgeOver = true;
      //     } else {
      //       this.personalAgeOver = false;
      //     }
      //   } else if (year == minYear) {
      //
      //     if ((this.pBirthYear >= minYear && this.pBirthMonth >= currentMonth && this.pBirthDay >= currentDay)) {
      //       this.personalAgeOver = true;
      //     } else {
      //       this.personalAgeOver = false;
      //     }
      //   } else if (year < maxYear && year > minYear) {
      //     if (year < maxYear && this.pBirthMonth < currentMonth && this.pBirthDay < currentDay) {
      //       this.personalAgeOver = false;
      //     }
      //     if ((year > minYear && this.pBirthMonth > currentMonth) || (year > minYear && this.pBirthMonth == currentMonth && this.pBirthDay < currentDay)) {
      //       this.personalAgeOver = false;
      //     } else {
      //       this.personalAgeOver = true;
      //     }
      //   }
      //   if ((year > maxYear && month > currentMonth && day > currentDay) && (year < minYear && month > currentMonth)) {
      //     this.personalAgeOver = false;
      //   }
      }
    } else {
      this.personalAgeOver = false;
    }
  }

  checkCityArea(city, area) {
    if(!city || !area) {
      return true;
    }
  }

  checkAlonePid(value){
    if(this.pidCheck(value)){
      this.alonePidTypeWrong = true;
      this.toRecheckAgain();
    }else{
      this.toRecheckAgain();
      this.alonePidTypeWrong = false;
    }
  }

  userPidFail: any;
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

  toZipCode(value, areaId = null) {
    if(value){
     this.areaList.forEach((item) => {
       if(item.id == areaId){
         this.areaZipCode = item.zipCode
       } else if(item.id == value.value){
         this.areaZipCode = item.zipCode
       }
     });
   }
  }

  toLoadArea(value = null) {
    var emptyArray = [];
    if(this.selectedCity && value == 'init'){
      this.areaList.forEach((item) => {
        if(item.cityId == this.selectedCity){
          emptyArray.push(item);
          this.filteredArea = emptyArray;
        }
      })
    } else {
      this.selectedDistrict = '';
      this.areaZipCode = '';
      this.areaList.filter(item => item.cityId == this.selectedCity).map((data)=>{
        emptyArray.push(data);
      });
      this.filteredArea = emptyArray;

    }
  }

  ToShowConfirmModal(val:boolean){
    console.log(this.EmailEl['invalid']);
    console.log(this.mobileEl['invalid']);
    console.log(this.firstNameEl['invalid']);
    console.log(this.lastNameEl['invalid']);
    if(!this.lastName ||
        !this.firstName ||
        !this.email ||
        !this.pid ||
        this.EmailEl['invalid'] ||
        this.mobileEl['invalid'] ||
        this.firstNameEl['invalid'] ||
        this.lastNameEl['invalid'] ||
        this.userPidFail ||
        !this.pBirthYear ||
        !this.pBirthMonth ||
        !this.pBirthDay ||
        !this.Mobile ||
        !this.selectedCity ||
        !this.selectedDistrict ||
        !this.addr ||
        this.personalAgeOver
    ){
      this.hiddenAtBegining = 'hide';
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('您必須先填寫完以上資料');
      document.querySelector('#myModal .modal-content').scrollIntoView();
      this.dataService.idToGoFlow = 'flagForEmpty';
      // document.querySelector('#flagForEmpty').scrollIntoView();
      this.firstTimeClickHaoA = false;
      return false;
    }else{
      if(val && this.firstTimeClickHaoA){
        this.ModelClick(true);
        // var modal = document.getElementById('myConfirmModal');
        // modal.style.display = "block";
        // $('.modal').css({
        //   'height': $(document).height(),
        //   'padding': '15% 0',
        //   'text-align': 'center'
        // });
        // document.querySelector('#myConfirmModal .modal-content').scrollIntoView();
        // if(window.innerWidth <= 500){
        // }else{
        // }
        // above modal area
        // document.getElementById('myConfirmModal').scrollIntoView({block: 'start', behavior: 'smooth'});
      }else if(!val && this.firstTimeClickHaoA){
        var modal = document.getElementById('myConfirmModal2');
        modal.style.display = "block";
        $('.modal').css({
          'height': $(document).height(),
          'padding': '15% 0',
          'text-align': 'center'
        });
        document.querySelector('#myConfirmModal2 .modal-content').scrollIntoView();
        if(window.innerWidth <= 500){
          // $('.modal-content').css({
          //   'margin-top': '200%'
          // });
          // document.getElementById('myConfirmModal2').scrollIntoView({block: 'start', behavior: 'smooth'});
        }else{
        }
        $('.modal-content').css({
        });
        // document.getElementById('myConfirmModal2').scrollIntoView({block: 'start', behavior: 'smooth'});
      }
      if(!this.firstTimeClickHaoA){
        if(this.dataService.backFromConfirm && this.dataService.noGoWithYourFdsFlag !== undefined){
          if(val){
            var modal = document.getElementById('myConfirmModal');
            modal.style.display = "block";
            $('.modal').css({
              'height': $(document).height(),
              'padding': '15% 0',
              'text-align': 'center'
            });
            if(window.innerWidth <= 500){
            }else{
            }
            document.getElementById('myConfirmModal').scrollIntoView({block: 'start', behavior: 'smooth'});
          }else if(!val && this.firstTimeClickHaoA){
            var modal = document.getElementById('myConfirmModal2 .modal-content');
            modal.style.display = "block";
            $('.modal').css({
              'height': $(document).height(),
              'padding': '15% 0',
              'text-align': 'center'
            });
            if(window.innerWidth <= 500){
              // $('.modal-content').css({
              //   'margin-top': '200%'
              // });
              // document.getElementById('myConfirmModal2').scrollIntoView({block: 'start', behavior: 'smooth'});
            }else{
            }
            $('.modal-content').css({
            });
            document.getElementById('myConfirmModal2 .modal-content').scrollIntoView({block: 'start', behavior: 'smooth'});
          }
        }else{
          this.GoingWithFds(val);
        }
      }
    }
  }

  GoingWithFds(val) {
    this.firstTimeClickHaoA = true;
    if(!val){
      if(this.hiddenAtBegining == 'hide'){
        if(!this.lastName ||
          !this.firstName ||
          !this.email ||
          !this.pid ||
          !this.pBirthYear ||
          !this.pBirthMonth ||
          !this.pBirthDay ||
          !this.Mobile ||
          !this.selectedCity ||
          !this.selectedDistrict ||
          !this.addr ||
          this.personalAgeOver
        ){
          this.hiddenAtBegining = 'hide';
          var modal = document.getElementById('myModal');
          modal.style.display = "block";
          this.dataService.AlertTXT = [];
          this.dataService.AlertTXT.push('您必須先填寫完以上資料');
          document.querySelector('#myModal .modal-content').scrollIntoView();
          this.dataService.idToGoFlow = 'flagForEmpty';
          this.firstTimeClickHaoA = false;
          return false;
        }else{
          this.noGoWithYourFds = false;
          this.personalInfoSelect = '本人';
          this.personalSelectChange();
          this.toGoWithYourFdsClick = false;
          this.hiddenAtBegining = false;
          document.querySelector('#addInsuredAdd').scrollIntoView();

        }
      }else{
        if(!this.ans){
          this.noGoWithYourFds = true;
          return false;
        }else{
          this.noGoWithYourFds = false;
          this.personalInfoSelect = '本人';
          this.personalSelectChange();
          this.toGoWithYourFdsClick = false;
          this.hiddenAtBegining = false;
          document.querySelector('#addInsuredAdd').scrollIntoView();
        }
      }
    }else{
      if(this.hiddenAtBegining == 'hide') {
        if (!this.lastName ||
            !this.firstName ||
            !this.email ||
            !this.pid ||
            !this.pBirthYear ||
            !this.pBirthMonth ||
            !this.pBirthDay ||
            !this.Mobile ||
            !this.selectedCity ||
            !this.selectedDistrict ||
            !this.addr ||
            this.personalAgeOver
        ){
          this.hiddenAtBegining = 'hide';
          var modal = document.getElementById('myConfirmModal');
          modal.style.display = "block";
          this.dataService.AlertTXT = [];
          this.dataService.AlertTXT.push('您必須先填寫完以上資料');
          this.firstTimeClickHaoA = false;
          this.dataService.idToGoFlow = 'flagForEmpty';
          document.querySelector('#myModal .modal-content').scrollIntoView();

          return false;
        }else{
          this.noGoWithYourFds = true;
          this.hiddenAtBegining = true;
          this.toGoWithYourFdsClick = false;
          this.btnClickToGoFds = true;
          this.owlAnanOne = false;
          this.dataService.owlAnanOne = false;
          document.querySelector('.pointAddPPlNum').scrollIntoView();
        }
        }else{
        if(!this.ans){
          this.noGoWithYourFds = false;
          document.querySelector('.pointAddPPlNum').scrollIntoView();
          return false;
        }else{
          this.noGoWithYourFds = true;
          this.hiddenAtBegining = true;
          this.personalInfoSelect = '本人';
          this.toGoWithYourFdsClick = false;
          this.btnClickToGoFds = true;
          this.owlAnanOne = false;
          this.dataService.owlAnanOne = false;
          document.querySelector('#addInsuredAdd').scrollIntoView();
        }
      }

    }
  };


  ModelCancel(){
      var modal = document.getElementById('myConfirmModal');
      modal.style.display = "none";
      var modal = document.getElementById('myConfirmModal2');
      modal.style.display = "none";
  }

  ModelClick(val:boolean){
      this.ans = true;
    if(val){
      var modal = document.getElementById('myConfirmModal');
      modal.style.display = "none";
      this.GoingWithFds(true);
    }else{
      var modal = document.getElementById('myConfirmModal2');
      modal.style.display = "none";
      this.GoingWithFds(false);
    }
  }
    // var ans;
    // if(this.hiddenAtBegining == 'hide'){
    //
    //
    //   }else{
    //     this.hiddenAtBegining = true;
    //     this.toGoWithYourFdsClick = false;
    //     this.btnClickToGoFds = true;
    //     this.owlAnanOne = false;
    //     this.dataService.owlAnanOne = false;
    //     ans = true;
    //     var body = $("html, body");
    //     if(window.innerWidth <= 500){
    //       body.stop().animate({scrollTop:1190}, 200, 'swing', function() {
    //       });
    //     }else{
    //       body.stop().animate({scrollTop:1020}, 200, 'swing', function() {
    //       });
    //     }
    //   }
    // }else{
    //   if(!this.lastName &&
    //       !this.firstName &&
    //       !this.email &&
    //       !this.pid &&
    //       !this.pBirthYear &&
    //       !this.pBirthMonth &&
    //       !this.pBirthDay &&
    //       !this.Mobile &&
    //       !this.selectedCity &&
    //       !this.selectedDistrict &&
    //       !this.addr ||
    //       this.personalAgeOver
    //   ){
    //     this.hiddenAtBegining = 'hide';
    //     var modal = document.getElementById('myModal');
    //     modal.style.display = "block";
    //     this.dataService.AlertTXT = [];
    //     this.dataService.AlertTXT.push('您必須先填寫完以上資料');
    //     var body = $("html, body");
    //     body.stop().animate({scrollTop:0}, 200, 'swing', function() {
    //     });
    //     return false;
    //   }else{
    //     this.hiddenAtBegining = true;
    //     this.toGoWithYourFdsClick = false;
    //     this.btnClickToGoFds = true;
    //     this.owlAnanOne = false;
    //     this.dataService.owlAnanOne = false;
    //     ans = confirm('您的被保人資料將不被保留，要繼續？');
    //     var body = $("html, body");
    //     if(window.innerWidth <= 500){
    //       body.stop().animate({scrollTop:1190}, 200, 'swing', function() {
    //       });
    //     }else {
    //       body.stop().animate({scrollTop: 1020}, 200, 'swing', function () {
    //       });
    //     }
    //     var body = $("html, body");
    //     if(window.innerWidth <= 500){
    //       body.stop().animate({scrollTop:1190}, 200, 'swing', function() {
    //       });
    //     }else{
    //       body.stop().animate({scrollTop:1020}, 200, 'swing', function() {
    //       });
    //     }
    //   }
    // }
    // console.log(ans);
    // if(!ans){
    //   return false;
    // }else{
    //
    // }


  // noGoingWithFds(val) {
  //   if(!val){
  //     this.noGoWithYourFds = false;
  //   }else{
  //     this.noGoWithYourFds = true;
  //   }
  //   this.personalInfoSelect = '本人';
  //   this.personalSelectChange();
  //   console.log('hiddener', this.hiddenAtBegining);
  //   var ans;
  //   if(this.hiddenAtBegining == 'hide'){
  //     ans = true;
  //   }else{
  //     if( !this.lastName &&
  //         !this.firstName &&
  //         !this.email &&
  //         !this.pid &&
  //         !this.pBirthYear &&
  //         !this.pBirthMonth &&
  //         !this.pBirthDay &&
  //         !this.Mobile &&
  //         !this.selectedCity &&
  //         !this.selectedDistrict &&
  //         !this.addr ||
  //         this.personalAgeOver
  //     ){
  //       this.hiddenAtBegining = 'hide';
  //       var modal = document.getElementById('myModal');
  //       modal.style.display = "block";
  //       this.dataService.AlertTXT = [];
  //       this.dataService.AlertTXT.push('您必須先填寫完以上資料');
  //       var body = $("html, body");
  //       body.stop().animate({scrollTop:0}, 200, 'swing', function() {
  //       });
  //       return false;
  //       }else{
  //       ans = confirm('您的被保人資料將不被保留，要繼續？');
  //       if(!ans){
  //         this.noGoWithYourFds = false;
  //       }else{

  //       }
  //     }
  //
  //     var body = $("html, body");
  //     if(window.innerWidth <= 500){
  //       body.stop().animate({scrollTop:1190}, 200, 'swing', function() {
  //       });
  //     }else{
  //       body.stop().animate({scrollTop:1020}, 200, 'swing', function() {
  //       });
  //     }
  //   }


  windowSizeCheck(){
    if(window.innerWidth < 500){
      return true;
    }else{
      return false;
    }
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

  reloadedAgain() {
    if(this.dataService.backFromConfirm){
      this.dataService.toGetBakInfo().subscribe((item) => {
        this.aggreeToUpdate = item['isUpdate'];
      });
    }
  }

  calculate_age(birth_month,birth_day,birth_year)
  {
    let today_date = new Date();
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

  ngOnInit() {
    if(this.dataService.backFromConfirm && this.dataService.noGoWithYourFdsFlag !== undefined){
      this.hiddenAtBegining = false;
      this.firstTimeClickHaoA = true;
      this.noGoWithYourFds = this.dataService.noGoWithYourFdsFlag;
      if(!this.noGoWithYourFds){
        this.dataService.toGetBakInfo().subscribe((item) => {
          this.aggreeToUpdate = item['applicant']['isUpdate'];
          this.insuredList = item['insuredList'];
          console.log(item);
          this.relationShip = item.relationList;
          this.rateInfoList = item.rateInfoList;
          console.log('insuredAgeMax', item.companySetting['insuredAgeMax']);
          console.log('insuredAgeMin', item.companySetting['insuredAgeMin']);

          this.insuredAgeMax = item.companySetting['insuredAgeMax'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.insuredMinAge = item.companySetting['insuredAgeMin'];

          this.applicantAgeMax = item.companySetting['applicantAgeMax'];
          this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.applicantAloneMinAge = item.companySetting['insuredAgeMin'];
          this.countBrthDayFromSelectedBtn = item['travelStartDate'];

          this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
          this.pBirthYear = item.applicant.birthday.slice(0, 4);
          this.pBirthMonth = item.applicant.birthday.slice(5, 7);

          this.relationship = item.relationList;
          this.applicantSelectBirth();
          if(item.applicant.birthday){
            item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
            this.pBirthYear = item.applicant.birthday.slice(0, 4);
            this.pBirthMonth = item.applicant.birthday.slice(5, 7);

            if (this.pBirthMonth.slice(0, 1) == '0') {
              this.pBirthMonth = this.pBirthMonth.slice(1, 2);
            }
            this.pBirthDay = item.applicant.birthday.slice(8, 10);
            if (this.pBirthDay.slice(0, 1) == '0') {
              this.pBirthDay = this.pBirthDay.slice(1, 2);
            }
          }
          this.birthYears();

          let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          if(personAge < item.companySetting['applicantAgeMin']){
            this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.personalAgeOver = true;
          } else {
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
          }
          this.birthYears();

          this.pdfUrl4Terms = item.pdfUrl4Terms;
          this.relationship = item.relationList;
          this.email = item.applicant.email;
          this.email.length == 0 ? this.checkEmailDis = false : this.checkEmailDis = true;
          this.lastName = item.applicant.lastName;
          this.lastName.length == 0 ? this.checkLastNameDis = false : this.checkLastNameDis = true;
          this.firstName = item.applicant.firstName;
          this.firstName.length == 0 ? this.checkFirstNameDis = false : this.checkFirstNameDis = true;
          this.pid = item.applicant.pid;
          this.pid.length == 0 ? this.checkPidDis = false : this.checkPidDis = true;

          // item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
          // this.pBirthYear = item.applicant.birthday.slice(0, 4);
          // this.pBirthMonth = item.applicant.birthday.slice(5, 7);
          // if (this.pBirthMonth.slice(0, 1) == '0') {
          //   this.pBirthMonth = this.pBirthMonth.slice(1, 2);
          // }
          // this.pBirthDay = item.applicant.birthday.slice(8, 10);
          // if (this.pBirthDay.slice(0, 1) == '0') {
          //   this.pBirthDay = this.pBirthDay.slice(1, 2);
          // }
          //
          // let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          //
          // this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          // this.applicantSelectBirth();
          //
          // if(personAge <= item.companySetting['applicantAgeMin']){
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
          //   this.applicantSelectBirth();
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   this.personalAgeOver = true;
          // }else {
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   this.applicantSelectBirth();
          // }

          this.Mobile = item.applicant.mobile;
          this.selectedCity = (item.applicant.addressCityId == 0 ? '' : item.applicant.addressCityId);
          this.toLoadArea('init');
          this.selectedDistrict = (item.applicant.addressAreaId == 0 ? '' : item.applicant.addressAreaId);
          this.toZipCode(true, this.selectedDistrict);
          this.addr = item.applicant['address'];
          if (!this.Mobile || !this.selectedCity || !this.selectedDistrict || !this.addr) {
            this.hideUpinput = true;
          } else {
            this.hideUpinput = false;
          }

          this.insuredList.forEach((item, index)=>{
            switch(index){
              case 0:
                if(item['relation']){
                  this.applicantAloneLockInput = true;
                }else{
                  this.applicantAloneLockInput = false;
                }
                this.personalInfoSelect = item['relation'];
                if(this.personalInfoSelect !== '本人'){
                  this.applicantAloneLockInput = false;
                }
                this.applicantAloneLastName = item['lastName'];
                this.applicantAloneFirstName = item['firstName'];
                this.applicantAlonePid = item['pid'];
                this.applicantAloneBirthYear = item['birthday'].slice(0, 4);
                this.applicantAloneBirthMonth = item['birthday'].slice(5,6) == 0? item['birthday'].slice(6,7): item['birthday'].slice(5,7);
                this.applicantAloneBirthDay =  item['birthday'].slice(8,9) == 0? item['birthday'].slice(9,10): item['birthday'].slice(8,10);
                this.aloneLastNameEmpty = false;
                this.aloneFirstNameEmpty = false;
                this.alonePidEmpty = false;
                this.alonePidTypeWrong = false;
                this.aloneBdEmpty = false;
                this.alonePidWrong = false;
                this.alonePidTypeWrong = false;
                this.aloneBdWrong = false;
                this.aloneNameFirstChinese = false;
                this.aloneNameLastChinese = false;
                break;
              default:
            }
          })
        });
      }else{
        this.dataService.toGetBakInfo().subscribe((item) => {
          this.aggreeToUpdate = item['applicant']['isUpdate'];
          this.insuredList = item['insuredList'];
          console.log(item);
          this.relationShip = item.relationList;
          this.rateInfoList = item.rateInfoList;
          console.log('insuredAgeMax', item.companySetting['insuredAgeMax']);
          console.log('insuredAgeMin', item.companySetting['insuredAgeMin']);

          this.insuredAgeMax = item.companySetting['insuredAgeMax'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.insuredMinAge = item.companySetting['insuredAgeMin'];

          this.applicantAgeMax = item.companySetting['applicantAgeMax'];
          this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.applicantAloneMinAge = item.companySetting['insuredAgeMin'];
          this.countBrthDayFromSelectedBtn = item['travelStartDate'];

          this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
          this.pBirthYear = item.applicant.birthday.slice(0, 4);
          this.pBirthMonth = item.applicant.birthday.slice(5, 7);

          this.relationship = item.relationList;
          this.applicantSelectBirth();
          if(item.applicant.birthday){
            item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
            this.pBirthYear = item.applicant.birthday.slice(0, 4);
            this.pBirthMonth = item.applicant.birthday.slice(5, 7);

            if (this.pBirthMonth.slice(0, 1) == '0') {
              this.pBirthMonth = this.pBirthMonth.slice(1, 2);
            }
            this.pBirthDay = item.applicant.birthday.slice(8, 10);
            if (this.pBirthDay.slice(0, 1) == '0') {
              this.pBirthDay = this.pBirthDay.slice(1, 2);
            }
          }
          this.birthYears();

          let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          if(personAge < item.companySetting['applicantAgeMin']){
            this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.personalAgeOver = true;
          } else {
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
          }
          this.birthYears();

          this.pdfUrl4Terms = item.pdfUrl4Terms;
          this.relationship = item.relationList;
          this.email = item.applicant.email;
          this.email.length == 0 ? this.checkEmailDis = false : this.checkEmailDis = true;
          this.lastName = item.applicant.lastName;
          this.lastName.length == 0 ? this.checkLastNameDis = false : this.checkLastNameDis = true;
          this.firstName = item.applicant.firstName;
          this.firstName.length == 0 ? this.checkFirstNameDis = false : this.checkFirstNameDis = true;
          this.pid = item.applicant.pid;
          this.pid.length == 0 ? this.checkPidDis = false : this.checkPidDis = true;

          // item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
          // this.pBirthYear = item.applicant.birthday.slice(0, 4);
          // this.pBirthMonth = item.applicant.birthday.slice(5, 7);
          // if (this.pBirthMonth.slice(0, 1) == '0') {
          //   this.pBirthMonth = this.pBirthMonth.slice(1, 2);
          // }
          // this.pBirthDay = item.applicant.birthday.slice(8, 10);
          // if (this.pBirthDay.slice(0, 1) == '0') {
          //   this.pBirthDay = this.pBirthDay.slice(1, 2);
          // }
          //
          // let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          //
          // this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          // this.applicantSelectBirth();
          //
          // if(personAge <= item.companySetting['applicantAgeMin']){
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
          //   this.applicantSelectBirth();
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   this.personalAgeOver = true;
          // }else {
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   this.applicantSelectBirth();
          // }

          this.Mobile = item.applicant.mobile;
          this.selectedCity = (item.applicant.addressCityId == 0 ? '' : item.applicant.addressCityId);
          this.toLoadArea('init');
          this.selectedDistrict = (item.applicant.addressAreaId == 0 ? '' : item.applicant.addressAreaId);
          this.toZipCode(true, this.selectedDistrict);
          this.addr = item.applicant['address'];
          if (!this.Mobile || !this.selectedCity || !this.selectedDistrict || !this.addr) {
            this.hideUpinput = true;
          } else {
            this.hideUpinput = false;
          }

        });
      }
    }
    this.birthdayMonths = this.birthMonths();
    this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
    this.aloneBirthdayDays = this.birthdayDays;
    let sendDataBak = {};
    sendDataBak['product'] = 'Travel';
    sendDataBak['pack'] = '';
    this.dataService.getIniData(sendDataBak).subscribe((data) => {
      this.cityList = data.cityList;
      this.areaList = data.areaList;
      this.toLoadArea('init');
      this.toZipCode(true, this.selectedDistrict);
    });
    if(this.dataService.backFromConfirm){
    }else{
      var Url = window.location.href;
      var turnBakUrl = this.toGetDataFromUrl(Url);
      var idArray = this.toGetId(Url);
      idArray['orderNumber'].forEach((item) => {
        this.dataService.orderNumberForSave = item;
      });
      this.dataService.toGetInsuredInfo(idArray).subscribe((item) => {
        if (item) {
          console.log(item);
          this.rateInfoList = item.rateInfoList;
          this.relationShip = item['relationList'];
          console.log('insuredAgeMax', item.companySetting['insuredAgeMax']);
          console.log('insuredAgeMin', item.companySetting['insuredAgeMin']);

          this.insuredAgeMax = item.companySetting['insuredAgeMax'];
          this.insuredAgeMin = item.companySetting['insuredAgeMin'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.insuredMinAge = item.companySetting['insuredAgeMin'];

          this.applicantAgeMax = item.companySetting['applicantAgeMax'];
          this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          this.insuredLimitedAge = item.companySetting['insuredAgeMax'] - item.companySetting['insuredAgeMin'];
          this.applicantAloneMinAge = item.companySetting['insuredAgeMin'];
          this.countBrthDayFromSelectedBtn = item['travelStartDate'];

          this.applicantAgeMin = item.companySetting['applicantAgeMin'];

          this.relationship = item.relationList;
          this.applicantSelectBirth();

          if(item.applicant.birthday){
            item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
            this.pBirthYear = item.applicant.birthday.slice(0, 4);
            this.pBirthMonth = item.applicant.birthday.slice(5, 7);

            if (this.pBirthMonth.slice(0, 1) == '0') {
              this.pBirthMonth = this.pBirthMonth.slice(1, 2);
            }
            this.pBirthDay = item.applicant.birthday.slice(8, 10);
            if (this.pBirthDay.slice(0, 1) == '0') {
              this.pBirthDay = this.pBirthDay.slice(1, 2);
            }
          }


          this.birthYears();

          let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          console.log('要保人', personAge);
          console.log('要保人最低要保年齡', item.companySetting['applicantAgeMin']);
          if(personAge < item.companySetting['applicantAgeMin']){
            this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.personalAgeOver = true;
          } else {
            this.applicantAgeMin = item.companySetting['applicantAgeMin'];
            this.applicantSelectBirth();
          }

          this.pdfUrl4Terms = item.pdfUrl4Terms;
          this.relationship = item.relationList;
          this.email = item.applicant.email;
          this.email.length == 0 ? this.checkEmailDis = false : this.checkEmailDis = true;
          this.lastName = item.applicant.lastName;
          this.lastName.length == 0 ? this.checkLastNameDis = false : this.checkLastNameDis = true;
          this.firstName = item.applicant.firstName;
          this.firstName.length == 0 ? this.checkFirstNameDis = false : this.checkFirstNameDis = true;
          this.pid = item.applicant.pid;
          this.pid.length == 0 ? this.checkPidDis = false : this.checkPidDis = true;
          // item.applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
          // this.pBirthYear = item.applicant.birthday.slice(0, 4);
          // this.pBirthMonth = item.applicant.birthday.slice(5, 7);
          //
          // if (this.pBirthMonth.slice(0, 1) == '0') {
          //   this.pBirthMonth = this.pBirthMonth.slice(1, 2);
          // }
          // this.pBirthDay = item.applicant.birthday.slice(8, 10);
          // if (this.pBirthDay.slice(0, 1) == '0') {
          //   this.pBirthDay = this.pBirthDay.slice(1, 2);
          // }
          // let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
          // console.log(this.pBirthYear);
          // console.log(this.pBirthMonth);
          // console.log(this.pBirthDay);
          // console.log(personAge);
          // if(personAge <= item.companySetting['applicantAgeMin']){
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'] - item.companySetting['applicantAgeMin'];
          //   this.applicantSelectBirth();
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   this.personalAgeOver = true;
          //   console.log('4312', this.applicantAgeMin);
          //
          // } else {
          //   this.applicantAgeMin = item.companySetting['applicantAgeMin'];
          //   console.log('4312', this.applicantAgeMin);
          //   this.applicantSelectBirth();
          // }

          this.Mobile = item.applicant.mobile;
          this.selectedCity = (item.applicant.addressCityId == 0 ? '' : item.applicant.addressCityId);
          this.toLoadArea('init');
          this.selectedDistrict = (item.applicant.addressAreaId == 0 ? '' : item.applicant.addressAreaId);
          this.toZipCode(true, this.selectedDistrict);
          this.addr = item.applicant['address'];
          if (!this.Mobile || !this.selectedCity || !this.selectedDistrict || !this.addr) {
            this.hideUpinput = true;
          } else {
            this.hideUpinput = false;
          }
        }
      });
    }
    this.owlAnanOne = this.dataService.owlAnanOne;
    this.owlAnanTwo = this.dataService.owlAnanTwo;
    this.owlAnanThree = this.dataService.owlAnanThree;
    this.owlAnanFour = this.dataService.owlAnanFour;
    this.owlAnanFifth = this.dataService.owlAnanFifth;
  }

  deleteThisOne() {
  }

  deleteThisMinus() {
    var lengthOfOwls = $('#insuredInfoAppend').children('#insuredOneCard').length;
    switch (lengthOfOwls) {
      case 2:
        this.dataService.owlAnanOne = true;
        this.owlAnanOne = true;
        break;
      case 3:
        this.dataService.owlAnanTwo = true;
        this.owlAnanTwo = true;
        break;
      case 4:
        this.dataService.owlAnanThree = true;
        this.owlAnanThree = true;
        break;
      case 5:
        this.dataService.owlAnanFour = true;
        this.owlAnanFour = true;
        break;
      case 6:
        this.dataService.owlAnanFifth = true;
        this.owlAnanFifth = true;
        break;
      default:
    };
    if(($('#insuredInfoAppend').children('#insuredOneCard').length) == 1){
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('最少必須一人');
    } else {
    };
  }

  applicantSelectBirth() {
    var date = new Date(this.countBrthDayFromSelectedBtn);
    let endAge = this.applicantAgeMax - this.applicantAgeMin;
    console.log('endage', endAge);
    let limitAge = date.getFullYear() - this.applicantAgeMin;
    var returnVal = [];
    returnVal.push(limitAge);
    for (var i = 0; i <= (endAge+1); i++) {
      if(i < (endAge+1)){
        limitAge--;
        returnVal.push(limitAge);
      } else {
        this.applicantSelectListYear = returnVal;
      }
    }
  }

  birthYears() {
    console.log(this.countBrthDayFromSelectedBtn);
    console.log(this.insuredLimitedAge);
    var date = new Date(this.countBrthDayFromSelectedBtn);
    let limitAge = date.getFullYear() - this.applicantAloneMinAge;
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

  getCustomerHomePage(){
    this.dataService.getCustomerHomePage().subscribe((item)=>{
      console.log(item);
    });
  }

  birthMonths() {
    var months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }
    return months;
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

  createInsuredCard() {
    var lengthOfOwls = $('#insuredInfoAppend').children('#insuredOneCard').length;
    switch (lengthOfOwls) {
      case 1:
        this.dataService.owlAnanOne = false;
        this.owlAnanOne = false;
      break;
      case 2:
        this.dataService.owlAnanTwo = false;
        this.owlAnanTwo = false;
      break;
      case 3:
        this.dataService.owlAnanThree = false;
        this.owlAnanThree = false;
      break;
      case 4:
        this.dataService.owlAnanFour = false;
        this.owlAnanFour = false;
      break;
      case 5:
        this.dataService.owlAnanFifth = false;
        this.owlAnanFifth = false;
      break;
      default:
    }
    if(($('#insuredInfoAppend').children('#insuredOneCard').length) <= 5){
    } else {
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('您最多只能五位加保人');
      document.querySelector('#myModal').scrollIntoView();
    }
  }

  toUpdatePrice:boolean = false;
  finalPrice(){
    this.toUpdatePrice = true;
    return this.dataService.insuredTotal;
  }

  aloneLastNameEmpty: boolean = false;
  aloneFirstNameEmpty: boolean = false;
  alonePidEmpty: boolean = false;
  ToSaveInsured(){
    this.dataService.noGoWithYourFdsFlag = this.noGoWithYourFds;
    this.submitTimes = 0;
    this.dataService.backFromConfirm = false;
    this.readyToSaveData = true;
    this.dataService.SaveInsuredData['applicant'] = {};
    this.dataService.SaveInsuredData['applicant']['firstName'] = this.firstName;
    this.dataService.SaveInsuredData['applicant']['lastName'] = this.lastName;
    this.dataService.SaveInsuredData['applicant']['pid'] = this.pid;
    this.dataService.SaveInsuredData['applicant']['birthday'] = this.pBirthYear + '-' + (this.pBirthMonth.length == 1? '0'+this.pBirthMonth: this.pBirthMonth) + '-' + (this.pBirthDay.length == 1? '0'+ this.pBirthDay: this.pBirthDay);
    this.dataService.SaveInsuredData['applicant']['mobile'] = this.Mobile;
    this.dataService.SaveInsuredData['applicant']['email'] = this.email;
    this.dataService.SaveInsuredData['applicant']['addressCityId'] = this.selectedCity;
    this.dataService.SaveInsuredData['applicant']['addressAreaId'] = this.selectedDistrict;
    this.dataService.SaveInsuredData['applicant']['addressZipCode'] = this.areaZipCode;
    this.dataService.SaveInsuredData['applicant']['address'] = this.addr;
    this.dataService.SaveInsuredData['applicant']['isUpdate'] = this.aggreeToUpdate;

    if(!this.noGoWithYourFds){
      if(
          !this.personalInfoSelect ||
          !this.applicantAloneLastName ||
          !this.applicantAloneFirstName ||
          !this.applicantAlonePid ||
           this.alonePidTypeWrong ||
          !this.applicantAloneBirthYear ||
          !this.applicantAloneBirthMonth ||
          !this.applicantAloneBirthDay
      ){

        if(!this.personalInfoSelect){

        }else{

        }

        if(!this.applicantAloneLastName){
          this.aloneLastNameEmpty = true;
        }else{
          this.aloneLastNameEmpty = false;
        }

        if(!this.applicantAloneFirstName){
          this.aloneFirstNameEmpty = true;
        }else{
          this.aloneFirstNameEmpty = false;
        }

        if(!this.applicantAlonePid){
          this.alonePidEmpty = true;
        }else{
          this.alonePidEmpty = false;
        }

        if(this.alonePidTypeWrong){
          this.alonePidTypeWrong = true;
        }else{
          this.alonePidTypeWrong = false;
        }

        if(
          !this.applicantAloneBirthYear ||
          !this.applicantAloneBirthMonth ||
          !this.applicantAloneBirthDay
        ){
          this.aloneBdEmpty = true;
        }else{
          this.aloneBdEmpty = false;
        }

        this.toRecheck = true;
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填入要保人資料');
        var body = $("html, body");
        this.dataService.idToGoFlow = 'addInsuredAdd';
      }else{

        this.dataService.SaveInsuredData['insuredList'] = [];
        let returnObj = {};
        returnObj['relation'] = this.personalInfoSelect;
        returnObj['lastName'] = this.applicantAloneLastName;
        returnObj['firstName'] = this.applicantAloneFirstName;
        returnObj['pid'] = this.applicantAlonePid;
        returnObj['birthday'] = this.applicantAloneBirthYear + '-' + (this.applicantAloneBirthMonth.length == 1? '0'+ this.applicantAloneBirthMonth: this.applicantAloneBirthMonth) + '-' + (this.applicantAloneBirthDay.length == 1? '0'+ this.applicantAloneBirthDay: this.applicantAloneBirthDay);
        this.dataService.SaveInsuredData['insuredList'].push(returnObj);
        this.dataService.toSaveInsuredData();

      }
    }
  }
}
