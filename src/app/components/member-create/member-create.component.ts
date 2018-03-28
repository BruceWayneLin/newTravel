import {
  Component,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  routeUrlGoGoNeedToHide: boolean;
  mobileDisabled: boolean;
  checkboxValue:boolean;
  isShowCheckbox:boolean;
  gogooutCheckTxt: string;
  gogoOrderNumber: string;
  gogoAddrCityFail: boolean;
  gogoAddrAreaFail: boolean;
  gogoAddrFail: boolean;
  userPidFail: any;
  showAreaCityDoll: boolean;
  showAddrDoll: boolean;
  alonePidRepeat: boolean;
  rentalCarTemplate: Boolean = false;
  insuredSizeLimit: any = 6;
  aloneInsuredPrice: Number = 0;

  @ViewChild('emailElm') EmailEl:ElementRef;
  @ViewChild('lastNameEl') lastNameEl:ElementRef;
  @ViewChild('firstNameEl') firstNameEl:ElementRef;
  @ViewChild('birthdayCityEl') birthdayCityEl:ElementRef;
  @ViewChild('birthdayDistrictEl') birthdayDistrictEl:ElementRef;

  @ViewChild('MobileEl') mobileEl:ElementRef;
  @ViewChild('birthdayYAM') birthdayYAM:ElementRef;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private shareService: ShareService,
    private dataService: DataServiceService,
    public router:Router,
    private routerAct: ActivatedRoute
  ) {
    window.scrollTo(0, 0);
    $('html, body').animate({scrollTop: '0px'}, 0);
    if(this.router.url.slice(7, 15) == '/gogoout'){
      if(this.routerAct.queryParams['value']['orderNumber']){
      }else{
        this.router.navigate(['travel']);
      }
    }
  }

  ngOnInit() {
    var url = this.router.url;
    this.deterMineUrl(url);
    $('body').css({
      '-webkit-overflow-scrolling': 'auto'
    });
    setTimeout(function(){
      $('body').css({
        '-webkit-overflow-scrolling': 'touch'
      });
    }, 300);
  }

  numberWithCommas = (x) => {
    let Xn = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return Xn
  }

  checkAloneBd(val?){
    this.toRecheckAgain();
    var currentYear = new Date(this.countBrthDayFromSelectedBtn).getFullYear();
    var currentMonth = new Date(this.countBrthDayFromSelectedBtn).getMonth() + 1;
    var currentDay = new Date(this.countBrthDayFromSelectedBtn).getDate();

    if(val == 'reset'){
      this.applicantAloneBirthDay = '';
      this.aloneBirthdayDays =  this.birthDays(this.applicantAloneBirthYear, (this.applicantAloneBirthMonth < 10 ? '0'+this.applicantAloneBirthMonth:this.applicantAloneBirthMonth));
    }

    var userAge = this.calculate_for_BT_TR_age_From_(this.applicantAloneBirthMonth, this.applicantAloneBirthDay, this.applicantAloneBirthYear);
    this.rateInfoList.forEach((item) => {
      if((userAge >= item.ageMin) && (userAge <= item.ageMax)){
        console.log('被保險人', userAge);
        console.log('出發日年', currentYear);
        console.log('出發日月', currentMonth);
        console.log('出發日日', currentDay);
        this.aloneWarningWord = item.tipText;
        this.aloneInsuredPrice = this.numberWithCommas(item.rate);
      }
    });
    if(!this.routeUrlGoGoNeedToHide){
      if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth && this.applicantAloneBirthDay) {
        var userAge = this.calculate_for_BT_TR_age_From_(this.applicantAloneBirthMonth, this.applicantAloneBirthDay, this.applicantAloneBirthYear);
        
        // if(this.router.url.slice(7, 15) == '/gogoout'){
        // } else {
        //   var userAge = this.calculate_for_BT_TR_age_From_(this.applicantAloneBirthMonth, this.applicantAloneBirthDay, this.applicantAloneBirthYear);
        // }
        console.log('被保險人', userAge);
        console.log('出發日年', currentYear);
        console.log('出發日月', currentMonth);
        console.log('出發日日', currentDay);

        if(userAge < this.insuredMinAge || userAge > this.insuredAgeMax){
          this.aloneBdWrong = true;
          this.aloneBdEmpty = false;
        }else{
          this.aloneBdWrong = false;
        }
      }else{
        if (!this.applicantAloneBirthYear && !this.applicantAloneBirthMonth && !this.applicantAloneBirthDay) {
          this.aloneBdEmpty = true;
          this.aloneBdWrong = false;
        }
      }
    }else{
      var userAge = this.calculate_for_BT_TR_age_From_(this.applicantAloneBirthMonth, this.applicantAloneBirthDay, this.applicantAloneBirthYear);

      console.log('被保險人', userAge);
      console.log('出發日年', currentYear);
      console.log('出發日月', currentMonth);
      console.log('出發日日', currentDay);
      if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth){
        // this.aloneBirthdayDays =  this.birthDays(this.applicantAloneBirthYear, this.applicantAloneBirthMonth);
      }
      if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth && this.applicantAloneBirthDay){
        this.aloneBdEmpty = false;
        if(this.insuredLimitedAge !== 0){
          if(this.applicantAloneBirthYear <= (currentYear - (this.insuredLimitedAge+1))){
            if((this.applicantAloneBirthMonth < currentMonth) && (this.applicantAloneBirthDay >= currentDay) || (this.applicantAloneBirthMonth <= currentMonth) && (this.applicantAloneBirthDay <= currentDay)){
              this.aloneBdWrong = true;
              console.log('12343214321', this.rateInfoList);
            } else {
              this.aloneBdWrong = false;
            }
          } else if(this.applicantAloneBirthYear >= (currentYear - this.insuredMinAge)){
            if((this.applicantAloneBirthMonth >= currentMonth) && (this.applicantAloneBirthDay >= currentDay) || (this.applicantAloneBirthMonth > currentMonth) && (this.applicantAloneBirthDay <= currentDay)){
              this.aloneBdWrong = true;
              console.log('12343214321', this.rateInfoList);
  
              console.log('3', userAge);
            } else {
              this.aloneBdWrong = false;
              console.log('4', userAge);
            }
          }
          if(this.applicantAloneBirthYear <  (currentYear - this.insuredMinAge) && this.applicantAloneBirthYear > (currentYear - (this.insuredLimitedAge+1))){
            this.aloneBdWrong = false;
          }
  
        }
      } else if (!this.applicantAloneBirthYear && !this.applicantAloneBirthMonth && !this.applicantAloneBirthDay) {
        console.log('被保險人', userAge);
        console.log('出發日年', currentYear);
        console.log('出發日月', currentMonth);
        console.log('出發日日', currentDay);
        this.aloneBdEmpty = true;
        this.aloneBdWrong = false;
      }
    }
  }

  emailChange(email){
  }

  changedData(year=null, month=null, day=null){
    this.userPidFail = this.pidCheck(this.pid);
    this.personalSelectChange();
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
          this.aloneLastNameEmpty = false;
        }
      } else if (value && id == 'first'){
        if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
          this.aloneNameFirstChinese = false;
        } else {
          this.aloneNameFirstChinese = true;
          this.aloneFirstNameEmpty = false;
        }
      } else if (value || id == ''){
        if (value.match(/[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g)) {
          return false;
        } else {
          return true;
        }
      }
    }else{
      if(!value && id == 'last'){
          this.aloneLastNameEmpty = true;
          this.aloneNameLastChinese = false;
        } else if (!value && id == 'first'){
          this.aloneFirstNameEmpty = true;
          this.aloneNameFirstChinese = false;
      }
    }
  }

  toGoDownWindow(){
    this.dataService.toGoDown = true;
    if(this.router.url.slice(0, 8) == '/RentCar'){
      this.router.navigate(['RentCar/BtoBtoC'], {queryParams: {'orderNumber': this.routerAct.queryParams['value']['orderNumber']}});
    }
    if(this.router.url.slice(7, 20) == '/memberCreate'){
      this.router.navigate(['travel'], {queryParams: {'orderNumber': this.routerAct.queryParams['value']['orderNumber']}});
    }
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
      this.aloneInsuredPrice = 0;
      this.aloneWarningWord = '';

    } else {
      // this.checkVal();
      this.applicantAloneLockInput = true;
      this.applicantAloneLastName = this.lastName;
      this.applicantAloneFirstName = this.firstName;
      this.applicantAlonePid = this.pid;
      this.applicantAloneBirthYear = this.pBirthYear;
      this.applicantAloneBirthMonth = this.pBirthMonth;
      this.applicantAloneBirthDay = this.pBirthDay;
      this.checkAloneBd();

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
    this.gogoAddrFail = false;
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

  toReEnterFun() {
    if(this.pBirthYear && this.pBirthMonth){
      this.birthdayDays =  this.birthDays(this.pBirthYear, (this.pBirthMonth < 10 ? '0'+this.pBirthMonth:this.pBirthMonth));
      // this.birthdayDays = this.birthDays(new Date(this.pBirthYear).getFullYear(), new Date(this.pBirthMonth).getMonth()+1);
    }
    // if(this.applicantAloneBirthYear && this.applicantAloneBirthMonth){
    //   this.aloneBirthdayDays = this.birthDays(new Date(this.applicantAloneBirthYear).getFullYear(), new Date(this.applicantAloneBirthMonth).getMonth()+1);
    // }
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
      }
    } else {
      this.personalAgeOver = false;
    }
  }

  checkCityArea(city, area) {
    this.gogoAddrAreaFail = false;
    this.gogoAddrCityFail = false;
    if(!city || !area) {
      return true;
    }
  }

  checkAlonePid(value:any){
    if(this.pidCheck(value)){
      this.alonePidTypeWrong = true;
      this.alonePidRepeat = false;
      this.toRecheckAgain();
    }else{
      this.alonePidTypeWrong = false;
      if(value.toUpperCase() == this.pid && this.personalInfoSelect !== '本人'){
        this.alonePidRepeat = true;
      }else{
        this.alonePidRepeat = false;
      }
      this.toRecheckAgain();
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

  toZipCode(value, areaId = null) {
    this.checkCityArea(true, true);
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
    this.showAreaCityDoll = false;
    this.checkCityArea('true', 'false');
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
      this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
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

  calculate_for_BT_TR_age_From_(birth_month,birth_day,birth_year)
  {
    let today_date = new Date(this.countBrthDayFromSelectedBtn);
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

  deterMineUrl(url){
    if (url.slice(7, 20) == '/memberCreate') {
      this.toLoadMemberCreat();
    }
    if (url.slice(7, 15) == '/gogoout') {
      setTimeout(function() {
        var userAgent = window.navigator.userAgent;
        if (true) {
          document.getElementById('flagForEmpty').style.display = 'none';
          document.getElementById('flagForEmpty').style.display = 'block';
          var url = window.location.href; // get the current url of page into variable
          if (url.indexOf('?') > -1) { // url has a '?'
              if(url.indexOf('reloaded') < 0){ // url does not have the text 'reloaded'
              this.router.navigate(['travel/gogoout'], {queryParams: {orderNumber: this.routerAct.queryParams['value']['orderNumber']}});
              }
          }
        }
      }, 300);
      this.toLoadGoGoData();
    }
    if(url.slice(0, 8) == '/RentCar') {
      this.toLoadRentalCar();
    }
  }

  toLoadMemberCreat() {
    this.routeUrlGoGoNeedToHide = true;
    this.gogoAddrAreaFail = false;
    this.gogoAddrCityFail = false;
    this.gogoAddrFail = false;
    this.owlAnanOne = this.dataService.owlAnanOne;
    this.owlAnanTwo = this.dataService.owlAnanTwo;
    this.owlAnanThree = this.dataService.owlAnanThree;
    this.owlAnanFour = this.dataService.owlAnanFour;
    this.owlAnanFifth = this.dataService.owlAnanFifth;
    var orderNum = this.routerAct.queryParams['value']['orderNumber'];
    this.dataService.orderNumberForSave = orderNum;
    var sendDataBak = {};
    sendDataBak['product'] = 'Travel';
    sendDataBak['pack'] = '';
    sendDataBak['orderNumber'] = orderNum;
    this.dataService.getIniData(sendDataBak).subscribe((data) => {
      this.cityList = data.cityList;
      this.areaList = data.areaList;
      this.toLoadArea('init');
      this.toZipCode(true, this.selectedDistrict);
      this.birthdayMonths = this.birthMonths();
      this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
      this.aloneBirthdayDays = this.birthdayDays;
    });
    // this is when user back from confirm page then we check if calling api or not
    if(this.dataService.backFromConfirm && this.dataService.noGoWithYourFdsFlag !== undefined){
      this.hiddenAtBegining = false;
      this.firstTimeClickHaoA = true;
      this.noGoWithYourFds = this.dataService.noGoWithYourFdsFlag;
      if(!this.noGoWithYourFds && this.router.url.slice(7, 20) == '/memberCreate'){
        this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
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
          this.insuredSizeLimit = item.companySetting['insuredSizeLimit'];
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
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
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
          this.Mobile = item.applicant.mobile;
          this.selectedCity = (item.applicant.addressCityId == 0 ? '' : item.applicant.addressCityId);
          this.toLoadArea('init');
          this.selectedDistrict = (item.applicant.addressAreaId == 0 ? '' : item.applicant.addressAreaId);
          this.toZipCode(true, this.selectedDistrict);
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
          this.aloneBirthdayDays = this.birthdayDays;
          this.personalSelectChange();
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
        this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
          this.aggreeToUpdate = item['applicant']['isUpdate'];
          this.insuredList = item['insuredList'];
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
    }else{    
      var orderQuery = this.routerAct.queryParams['value']['orderNumber'];
      this.dataService.toGetInsuredInfo(orderQuery).subscribe((item) => {
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
          this.insuredSizeLimit = item.companySetting['insuredSizeLimit'];
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
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
          this.aloneBirthdayDays = this.birthdayDays;
          this.personalSelectChange();
        }
      });
    }
  }

  toLoadGoGoData(){
    this.routeUrlGoGoNeedToHide = false;
    var orderNum = this.routerAct.queryParams['value']['orderNumber'];
    this.dataService.orderNumberForSave = orderNum;
    this.dataService.gogoOrderNumber = orderNum;
    var sendDataBak = {};
    sendDataBak['product'] = 'Travel';
    sendDataBak['pack'] = '';
    sendDataBak['orderNumber'] = orderNum;
    this.dataService.getIniData(sendDataBak).do((data) => {
      this.hideUpinput = true;
      this.email = data['data']['applicant']['email'];
      this.lastName = data['data']['applicant']['lastName'];
      this.firstName = data['data']['applicant']['firstName'];
      this.pid = data['data']['applicant']['pid'];
      this.pdfUrl4Terms = data['data']['pdfUrl4Terms'];
      if(data['data'].applicant.birthday){
        data['data'].applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
        this.pBirthYear = data['data'].applicant.birthday.slice(0, 4);
        this.pBirthMonth = data['data'].applicant.birthday.slice(5, 7);
        if (this.pBirthMonth.slice(0, 1) == '0') {
          this.pBirthMonth = this.pBirthMonth.slice(1, 2);
        }
        this.pBirthDay = data['data'].applicant.birthday.slice(8, 10);
        if (this.pBirthDay.slice(0, 1) == '0') {
          this.pBirthDay = this.pBirthDay.slice(1, 2);
        }
      }
      this.applicantAgeMax = data['data']['companySetting']['applicantAgeMax'];
      this.applicantAgeMin = data['data']['companySetting']['applicantAgeMin'];
      this.insuredList = data['data']['insuredList'];

      this.insuredAgeMax = data['data'].companySetting['insuredAgeMax'];
      this.insuredLimitedAge = data['data'].companySetting['insuredAgeMax'] - data['data'].companySetting['insuredAgeMin'];
      this.insuredMinAge = data['data'].companySetting['insuredAgeMin'];
      this.countBrthDayFromSelectedBtn = data['data']['travelStartDate'];
      this.cityList = data['data']['cityList'];
      this.areaList = data['data']['areaList'];
      this.toLoadArea('init');
      this.toZipCode(true, this.selectedDistrict);
      if(!data['data']['applicant']['mobile']){
        this.Mobile = '';
        this.mobileDisabled = false;
      }else{
        this.Mobile = data['data']['applicant']['mobile'];
        this.mobileDisabled = true;
      }
      if(!data['data']['applicant']['addressCityId']){
        this.selectedCity = '';
        document.querySelector('#AddrCityFlag').scrollIntoView();
        this.gogoAddrCityFail = true;
      }else{
        this.selectedCity = data['data']['applicant']['addressCityId'];
        this.toLoadArea('init');
        this.toZipCode(true, this.selectedDistrict);
      }
      if(!data['data']['applicant']['addressAreaId']){
        this.selectedCity = '';
        document.querySelector('#AddrAreaFlag').scrollIntoView();
        this.gogoAddrAreaFail = true;
      }else{
        this.selectedDistrict = data['data']['applicant']['addressAreaId'];
        this.toLoadArea('init');
        this.toZipCode(true, this.selectedDistrict);
      }
      // data['data']['applicant']['address'] = 0;
      if(!data['data']['applicant']['address']){
        this.addr = '';
        document.querySelector('#AddrFlag').scrollIntoView();
        this.gogoAddrFail = true;
      }else{
        this.addr = data['data']['applicant']['address'];
      }
      this.applicantSelectBirth();
      this.checkboxValue = data['checkboxValue'];
      this.gogooutCheckTxt = data['checkboxText'];
      this.applicantAgeMax = data['data'].companySetting['applicantAgeMax'];
      this.applicantAgeMin = data['data'].companySetting['applicantAgeMin'];
      this.insuredLimitedAge = data['data'].companySetting['insuredAgeMax'] - data['data'].companySetting['insuredAgeMin'];
      this.applicantAloneMinAge = data['data'].companySetting['insuredAgeMin'];
      this.countBrthDayFromSelectedBtn = data['data']['travelStartDate'];
      this.applicantAgeMin = data['data'].companySetting['applicantAgeMin'];
      data['data'].applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
      this.pBirthYear = data['data'].applicant.birthday.slice(0, 4);
      this.pBirthMonth = data['data'].applicant.birthday.slice(5, 7);
      this.relationship = data['data'].relationList;
      this.applicantSelectBirth();
      if(data['data'].applicant.birthday){
        data['data'].applicant.birthday.length == 0 ? this.checkBDay = false : this.checkBDay = true;
        this.pBirthYear = data['data'].applicant.birthday.slice(0, 4);
        this.pBirthMonth = data['data'].applicant.birthday.slice(5, 7);
        if (this.pBirthMonth.slice(0, 1) == '0') {
          this.pBirthMonth = this.pBirthMonth.slice(1, 2);
        }
        this.pBirthDay = data['data'].applicant.birthday.slice(8, 10);
        if (this.pBirthDay.slice(0, 1) == '0') {
          this.pBirthDay = this.pBirthDay.slice(1, 2);
        }
      }
      this.birthYears();

      let personAge = this.calculate_age(this.pBirthMonth, this.pBirthDay, this.pBirthYear);
      if(personAge < data['data'].companySetting['applicantAgeMin']){
        this.applicantAgeMin = data['data'].companySetting['applicantAgeMin'] - data['data'].companySetting['applicantAgeMin'];
        this.applicantSelectBirth();
        this.applicantAgeMin = data['data'].companySetting['applicantAgeMin'];
        this.personalAgeOver = true;
      } else {
        this.applicantAgeMin = data['data'].companySetting['applicantAgeMin'];
        this.applicantSelectBirth();
      }
      this.birthdayMonths = this.birthMonths();
      this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
      this.aloneBirthdayDays = this.birthdayDays;

      this.noGoWithYourFds = false;
      this.hiddenAtBegining = '';
      this.relationship = data['data']['relationList'];
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
      this.isShowCheckbox = data['isShowCheckbox'];
     
      // if(this.checkboxValue){
      //   this.gogooutCheckTxt = '已是英國凱萊會員，可至會員專區檢視保單資料 ';
      // }else{
      //   this.gogooutCheckTxt = '同步加入英國凱萊，可於會員專區檢視保單資料';
      // }
      this.birthdayMonths = this.birthMonths();
      this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
      this.aloneBirthdayDays = this.birthdayDays;
      // lock inputs
      this.checkEmailDis = true;
      this.checkLastNameDis = true;
      this.checkFirstNameDis = true;
      this.checkPidDis = true;
    }).delay(500).subscribe(()=>{
      window.scrollTo(0, 0);
      $('html, body').animate({scrollTop: '0px'}, 0);
    });
  }

  toLoadRentalCar() {
    this.rentalCarTemplate = true;
    this.routeUrlGoGoNeedToHide = false;
    this.hiddenAtBegining = false;
    this.firstTimeClickHaoA = false;
    this.noGoWithYourFds = false;
    this.gogoAddrAreaFail = false;
    this.gogoAddrCityFail = false;
    this.gogoAddrFail = false;

    this.dataService.orderNumberForSave = this.routerAct.queryParams['value']['orderNumber'];
    this.owlAnanOne = this.dataService.owlAnanOne;
    this.owlAnanTwo = this.dataService.owlAnanTwo;
    this.owlAnanThree = this.dataService.owlAnanThree;
    this.owlAnanFour = this.dataService.owlAnanFour;
    this.owlAnanFifth = this.dataService.owlAnanFifth;
    var orderNum = this.routerAct.queryParams['value']['orderNumber'];
    this.dataService.orderNumberForSave = orderNum;
    var sendDataBak = {};
    sendDataBak['product'] = 'Travel';
    sendDataBak['pack'] = '';
    sendDataBak['orderNumber'] = orderNum;
    this.dataService.getIniData(sendDataBak).subscribe((data) => {
      this.cityList = data.cityList;
      this.areaList = data.areaList;
      this.toLoadArea('init');
      this.toZipCode(true, this.selectedDistrict);
      this.birthdayMonths = this.birthMonths();
      this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
      this.aloneBirthdayDays = this.birthdayDays;
      if(this.personalInfoSelect !== '本人'){
        this.applicantAloneLockInput = false;
      }else{
        this.applicantAloneLockInput = true;
      }
    });
    // this is when user back from confirm page then we check if calling api or not
    if(this.dataService.backFromConfirm && this.dataService.noGoWithYourFdsFlag !== undefined){
      this.hiddenAtBegining = false;
      this.firstTimeClickHaoA = true;
      this.noGoWithYourFds = this.dataService.noGoWithYourFdsFlag;
      if(!this.noGoWithYourFds){
        this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
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
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
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
          this.Mobile = item.applicant.mobile;
          this.selectedCity = (item.applicant.addressCityId == 0 ? '' : item.applicant.addressCityId);
          this.toLoadArea('init');
          this.selectedDistrict = (item.applicant.addressAreaId == 0 ? '' : item.applicant.addressAreaId);
          this.toZipCode(true, this.selectedDistrict);
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
          this.aloneBirthdayDays = this.birthdayDays;
          this.personalSelectChange();
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
                }else{
                  this.applicantAloneLockInput = true;
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
        })
      }else{
        this.dataService.toGetBakInfo(this.routerAct.queryParams['value']['orderNumber']).subscribe((item) => {
          this.aggreeToUpdate = item['applicant']['isUpdate'];
          this.insuredList = item['insuredList'];
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
        })
      }
    }else{    
      var orderQuery = this.routerAct.queryParams['value']['orderNumber'];
      this.dataService.toGetInsuredInfo(orderQuery).subscribe((item) => {
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
          this.birthdayMonths = this.birthMonths();
          this.birthdayDays = this.birthDays(new Date().getFullYear(), new Date().getMonth()+1);
          this.aloneBirthdayDays = this.birthdayDays;
          this.noGoWithYourFds = false;
          this.hiddenAtBegining = false;
          this.personalSelectChange();
        }
      })
    }
    
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
    console.log('countbrth', this.countBrthDayFromSelectedBtn);
    console.log('limit', this.insuredLimitedAge);
    var date = new Date(this.countBrthDayFromSelectedBtn);
    let limitAge = date.getFullYear() - this.applicantAloneMinAge;
    console.log('1234321341234321142', this.applicantAloneMinAge);
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
    var maxOwlsNumber = this.insuredSizeLimit;
    if(lengthOfOwls < maxOwlsNumber){
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
    }
    if(($('#insuredInfoAppend').children('#insuredOneCard').length) == maxOwlsNumber){
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('您最多只能'+ (maxOwlsNumber-1) +'位加保人');
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
          !this.applicantAloneBirthDay ||
          this.aloneBdEmpty ||
          this.aloneBdWrong ||
          (this.applicantAlonePid.toUpperCase() == this.pid && this.personalInfoSelect !== '本人')
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
          this.alonePidRepeat = false;
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
        if(this.applicantAlonePid.toUpperCase() == this.pid && this.personalInfoSelect !== '本人'){
          this.alonePidRepeat = true;
          this.alonePidEmpty = false;
        }else{
          this.alonePidRepeat = false;
        }
        this.toRecheck = true;
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.dataService.AlertTXT = [];
        this.dataService.AlertTXT.push('請正確填寫被保險人資料');
        var body = $("html, body");
        this.dataService.idToGoFlow = 'insuredPersonInfoArea';
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

  checkBoxToggle() {
    this.checkboxValue = !this.checkboxValue;
    var userAgent = window.navigator.userAgent;
    $('body').css({
      '-webkit-overflow-scrolling': 'auto'
    });
   
    setTimeout(function(){
      document.getElementById('checkBoxIdReload').style.display = 'none';
      document.getElementById('checkBoxIdReload').style.display = 'block';
      $('body').css({
        '-webkit-overflow-scrolling': 'touch'
      });
    }, 100);
  }

  ToSaveGoGoInsured(){
    let dataToGoinSendBak = {};
    dataToGoinSendBak['orderNumber'] = this.routerAct.queryParams['value']['orderNumber'];
    dataToGoinSendBak['applicant'] = {};
    dataToGoinSendBak['applicant']['firstName'] = this.firstName;
    dataToGoinSendBak['applicant']['lastName'] = this.lastName;
    dataToGoinSendBak['applicant']['pid'] = this.pid;
    dataToGoinSendBak['applicant']['birthday'] = this.pBirthYear + '-' + (this.pBirthMonth.length == 1? '0'+this.pBirthMonth: this.pBirthMonth) + '-' + (this.pBirthDay.length == 1? '0'+ this.pBirthDay: this.pBirthDay);
    dataToGoinSendBak['applicant']['mobile'] = this.Mobile;
    dataToGoinSendBak['applicant']['email'] = this.email;
    dataToGoinSendBak['applicant']['addressCityId'] = this.selectedCity;
    dataToGoinSendBak['applicant']['addressAreaId'] = this.selectedDistrict;
    dataToGoinSendBak['applicant']['addressZipCode'] = this.areaZipCode;
    dataToGoinSendBak['applicant']['address'] = this.addr;
    dataToGoinSendBak['applicant']['isJoinMember'] = this.checkboxValue;
    dataToGoinSendBak['insuredList'] = [];
    if(!this.addr){
      this.gogoAddrFail = true;
      this.showAddrDoll = true;
   }
   if(!this.selectedCity || !this.selectedDistrict){
      this.gogoAddrCityFail = true;
      this.gogoAddrAreaFail = true;
      this.showAreaCityDoll = true;
   }
   if(
    !this.addr || 
    !this.selectedCity ||
    !this.selectedDistrict
   ){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    this.dataService.AlertTXT = [];
    this.dataService.AlertTXT.push('請正確填寫要保人資料');
    var body = $("html, body");
    this.dataService.idToGoFlow = 'specialBirthColxs';
    return false;
   }
    
    let returnObj = {};
    returnObj['relation'] = this.personalInfoSelect;
    returnObj['lastName'] = this.applicantAloneLastName;
    returnObj['firstName'] = this.applicantAloneFirstName;
    returnObj['pid'] = this.applicantAlonePid;
    returnObj['birthday'] = this.applicantAloneBirthYear + '-' + (this.applicantAloneBirthMonth.length == 1? '0'+ this.applicantAloneBirthMonth: this.applicantAloneBirthMonth) + '-' + (this.applicantAloneBirthDay.length == 1? '0'+ this.applicantAloneBirthDay: this.applicantAloneBirthDay);
    dataToGoinSendBak['insuredList'].push(returnObj);
      if(
        !this.personalInfoSelect ||
        !this.applicantAloneLastName ||
        !this.applicantAloneFirstName ||
        !this.applicantAlonePid ||
        this.alonePidTypeWrong ||
        !this.applicantAloneBirthYear ||
        !this.applicantAloneBirthMonth ||
        !this.applicantAloneBirthDay ||
        this.aloneBdEmpty ||
        this.aloneBdWrong ||
        (this.applicantAlonePid.toUpperCase() == this.pid && this.personalInfoSelect !== '本人')
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
        this.alonePidRepeat = false;
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
      if(this.applicantAlonePid.toUpperCase() == this.pid && this.personalInfoSelect !== '本人'){
        this.alonePidRepeat = true;
        this.alonePidEmpty = false;
      }else{
        this.alonePidRepeat = false;
      }
      this.toRecheck = true;
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.dataService.AlertTXT = [];
      this.dataService.AlertTXT.push('請正確填寫被保險人資料');
      var body = $("html, body");
      this.dataService.idToGoFlow = 'insuredPersonInfoArea';
    }else{
      // this.dataService.SaveInsuredData['insuredList'] = [];
      // let returnObj = {};
      // returnObj['relation'] = this.personalInfoSelect;
      // returnObj['lastName'] = this.applicantAloneLastName;
      // returnObj['firstName'] = this.applicantAloneFirstName;
      // returnObj['pid'] = this.applicantAlonePid;
      // returnObj['birthday'] = this.applicantAloneBirthYear + '-' + (this.applicantAloneBirthMonth.length == 1? '0'+ this.applicantAloneBirthMonth: this.applicantAloneBirthMonth) + '-' + (this.applicantAloneBirthDay.length == 1? '0'+ this.applicantAloneBirthDay: this.applicantAloneBirthDay);
      // dataToGoinSendBak['insuredList'].push(returnObj);

      console.log('1234bak', JSON.stringify(dataToGoinSendBak));
      this.dataService.toCallGoGoApi(dataToGoinSendBak);
    }
  }
}
