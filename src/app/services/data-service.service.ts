import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { concatMap, timeout, catchError, delay } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import {routes} from "../app.module";

declare var jquery:any;
declare var $ :any;

const loadingClose = () => {
    this.loading = false;
}

@Injectable()
export class DataServiceService {
  public  SaveInsuredData: any = {};
  private headers = new Headers({'Content-Type': 'application/json'});
  private mockApi = 'api/mockPosts';
  public orderNumber = '';
  // public  finalPrice: number;
  public orderNumberForSave = '';
  public gogoOrderNumber = '';
  public clearData: boolean = false;
  public purposeImageUrl: string;
  public readyToSaveData: boolean = false;
  public noGoWithYourFds: boolean = false;
  public AlertTXT: any;
  public BackFromMemberPageInfo: any;

  insuredTotal: any;
  owlAnanOne: boolean = true;
  owlAnanTwo: boolean = true;
  owlAnanThree: boolean = true;
  owlAnanFour: boolean = true;
  owlAnanFifth: boolean = true;
  backFromConfirm: boolean;
  loading: boolean =  false;
  toGoDown:boolean = false;
  noGoWithYourFdsFlag: boolean;
  idToGoFlow: any;
  backFromNextPage:boolean = false;

    constructor(
        public http:Http,
        public route:Router
    ) {

    }

    getSignatureData(){
        var val = {};
        if(sessionStorage.getItem('pid')){
            val['orderNumber'] = JSON.parse(sessionStorage.getItem('pid'));  
        }else{
            val['orderNumber'] = this.gogoOrderNumber;
        }
        return this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/sign/initData', val
        ).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
                this.loading = false;
                return res.json();
            }
        });
    }  

    getIniData(val) {
        var apiCall = '';
            try{
            if(this.gogoOrderNumber){
                sessionStorage.setItem('pid', JSON.stringify(this.gogoOrderNumber));  
            }  
            }catch(error){
            }
        if(this.route.url.slice(7, 15) == '/gogoout'){
            if(!val['orderNumber']){
                val['orderNumber'] = this.gogoOrderNumber;
            }  
            apiCall = '/CareLineTravel/travel-mbr/b2bCar/gogoout/apIn/initData';
            return this.http.post(apiCall, val
            ).map(res => {
                this.loading = false;
                return res.json();
            });
        }else{
            return this.http.get('/CareLineTravel/travel-mbr/journey/initData?product='+val['product']+'&pack='+val['pack']
            ).map(res => {
                this.loading = false;
                return res.json();
            });
        }
    }

    getGoGoInitCancel(val) {
        this.loading = true;
        var postData;
        if(val){
         postData = {"orderNumber": val};
        }else{
         postData = {"orderNumber": this.gogoOrderNumber};
        }
        return this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/cancel/initData', postData)
        .map((result) => {
            if(result.json().isEx == true){
                if(result.json().kickout){ 
                }else{
                    if (result.json().data) {
                        // Server 回傳錯誤
                        if (result.json().data && result.json().data.errorFlagName) {
                            var flagName = result.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = result.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return 0;
            } else {
                this.loading = false;
                return result.json();
            }
        });
    }

    getPkPrice(value) {
        this.loading = true;

        return this.http.post('/CareLineTravel/travel-mbr/journey/calRateByPackage', value)
        .map((result) => {
            if(result.json().isEx == true){
                if(result.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    if (result.json().data) {
                        // Server 回傳錯誤
                        if (result.json().data && result.json().data.errorFlagName) {
                            var flagName = result.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = result.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return 0;
            } else {
                this.loading = false;
                console.log('PkPrice', result.json());
                return result.json();
            }
        });
    }

    getCusPkPrice(value) {
        this.loading = true;
        return this.http.post('/CareLineTravel/travel-mbr/journey/calRateByCusPackage', value)
        .map((result) => {
            if(result.json().isEx == true){
                if(result.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    if (result.json().data) {
                        // Server 回傳錯誤
                        if (result.json().data && result.json().data.errorFlagName) {
                            var flagName = result.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = result.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
            return 0;
            } else {
            this.loading = false;
            console.log('cusPkPrice', result.json());
            return result.json();
            }
        });
    }

    toSendInsuredDataToBakHomePage(value){
        this.loading = true;
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // let options = new RequestOptions({headers});
        // let  body = new URLSearchParams();
        // console.log(JSON.stringify(value));
        // body.append('data', JSON.stringify(value));
        var i = this.http.post('/CareLineTravel/travel-mbr/journey/savePackage', value).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
                return res.json()['orderNumber'];
            }
        });
        i.subscribe((item)=>{
            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            if(!item){
            } else {
                this.loading = true;
                this.orderNumber = item;
                window.location.href = '/CareLineTravel/travel-mbr/journey/loginMember?orderNumber=' + encodeURIComponent(this.orderNumber)+ '?' + timeStampInMs;
            }
        });
    }

    toGetInsuredInfo(value) {
        console.log('1234321', value);
        this.loading = true;
        var postData;
        if(value){
         postData = {"orderNumber": value};
        }else{
         postData = {"orderNumber": this.orderNumberForSave};
        }
        if(this.backFromConfirm){
            let objSendBak = {};
            objSendBak['orderNumber'] = postData['orderNumber'];
            return this.http.post('/CareLineTravel/travel-mbr/journey/getDataAfterLogin', objSendBak).map(res => {
                if(res.json().isEx){
                    if(res.json().kickout){
                        this.route.navigate(['travel']);
                    }else{
                        if (res.json().data) {
                            // Server 回傳錯誤
                            if (res.json().data && res.json().data.errorFlagName) {
                                var flagName = res.json().data.errorFlagName;
                                this.idToGoFlow = flagName;
                            }
                        }
                        this.loading = false;
                        var msgs = res.json().msgs;
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        this.AlertTXT = msgs;
                        document.querySelector('#myModal').scrollIntoView();
                    }
                } else {
                    this.loading = false;
                    return res.json();
                }
            });
        }else{
            let objSendBak = {};
            if(value){
            postData = {"orderNumber": value};
            }else{
            postData = {"orderNumber": this.orderNumberForSave};
            }
            objSendBak['orderNumber'] = postData['orderNumber'];
            return this.http.post('/CareLineTravel/travel-mbr/journey/getDataAfterLogin', objSendBak).map(res => {
                if(res.json().isEx){
                    if(res.json().kickout){
                        this.route.navigate(['travel']);
                    }else{
                        if (res.json().data) {
                            // Server 回傳錯誤
                            if (res.json().data && res.json().data.errorFlagName) {
                                var flagName = res.json().data.errorFlagName;
                                this.idToGoFlow = flagName;
                            }
                        }
                        this.loading = false;
                        var msgs = res.json().msgs;
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        this.AlertTXT = msgs;
                        document.querySelector('#myModal').scrollIntoView();
                    }
                } else {
                    this.loading = false;
                    return res.json();
                }
            });
        }
    }

    toGetBakInfo(value) {
            this.loading = true;
            var postData;
            if(value){
            postData = {"orderNumber": value};
            }else{
            postData = {"orderNumber": this.orderNumberForSave};
            }
            if(this.backFromConfirm) {
                let objSendBak = {};
                objSendBak['orderNumber'] = postData['orderNumber'];
                return this.http.post('/CareLineTravel/travel-mbr/journey/getDataWhenBackFromConfirmPage', objSendBak).map(res => {
                    if(res.json().isEx){
                        if(res.json().kickout){
                            this.route.navigate(['travel']);
                        }else{
                            this.loading = false;
                            var msgs = res.json().msgs;
                            var modal = document.getElementById('myModal');
                            modal.style.display = "block";
                            this.AlertTXT = msgs;
                            document.querySelector('#myModal').scrollIntoView();
                        }
                    } else {
                        this.loading = false;
                        return res.json();
                    }
                });
            }
    }

    failPaymentInfo(value){
        this.loading = true;
        let objSendBak = {};
        objSendBak['orderNumber'] = this.orderNumberForSave;
        return this.http.post('/CareLineTravel/travel-mbr/journey/getData4FailPayment', objSendBak).map(res => {
            if(res.json().isEx){
                if(res.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
            } else {
                this.loading = false;
                return res.json();
            }
        });
    }

    ifOnlyStartDayOnly(value){
        this.loading = true;
        return this.http.post('/CareLineTravel/travel-mbr/journey/filterPackage', value).map(res => {
            if(res.json().isEx){
                if(res.json().kickout){
                    this.route.navigate(['travel']);
                }else{
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
            } else {
                this.loading = false;
                return res.json();
            }
        });
    }

    toSaveInsuredData(){
        this.loading = true;
        this.SaveInsuredData['orderNumber'] = this.orderNumberForSave;
        console.log('saveinsuredData', this.SaveInsuredData);
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // let options = new RequestOptions({headers});
        // let  body = new URLSearchParams();
        setTimeout(() => {
            var i = this.http.post('/CareLineTravel/travel-mbr/journey/saveInsuredData', this.SaveInsuredData).map(res => {
                if(res.text() === 'ok'){
                    return res.text();
                }
                if (res.json().isEx) {
                    if(res.json().kickout){
                        this.route.navigate(['travel']);
                        this.loading = false;
                    }else{
                        if (res.json().data) {
                            // Server 回傳錯誤
                            if (res.json().data && res.json().data.errorFlagName) {
                                var flagName = res.json().data.errorFlagName;
                                this.idToGoFlow = flagName;
                            }
                        }
                        this.loading = false;
                        var msgs = res.json().msgs;
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        this.AlertTXT = msgs;
                        document.querySelector('#myModal').scrollIntoView();
                    }
                    return false;
                } else{
                    return res.text();
                }
            });
            i.subscribe((item)=>{
                if(item == 'ok'){
                    if(this.route.url.slice(0, 8) == '/RentCar'){
                        this.route.navigate(['RentCar/BtoBtoC/confirmPage'], {queryParams: {orderNumber: this.orderNumberForSave}});
                    }
                    if(this.route.url.slice(7, 20) == '/memberCreate'){
                        this.route.navigate(['travel/confirmPage'], {queryParams: {orderNumber: this.orderNumberForSave}});
                    }
                    this.loading = false;
                } else {
                }
            });
        }, 400);
    }

    toGoNextFromConfirm(val, kycAns){
        var postData;
        if(val){
         postData = {"orderNumber": val, 'kycSelections': kycAns};
        }else{
         postData = {"orderNumber": this.gogoOrderNumber, 'kycSelections': kycAns};
        }
        this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/confirm/next', postData).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.loading = false;
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
            return res.json(); 
            }
        }).subscribe((item)=>{
            if(item.status == 'ok'){
                this.route.navigate(['travel/gogoout/signature'], {queryParams: {orderNumber: postData['orderNumber']}});
            }
        });
    }

    toCallGoGoApi(data){
        this.loading = true;
        this.gogoOrderNumber = data['orderNumber'];
        setTimeout(() => {
            var i = this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/apIn/save', data).map(res => {
                if (res.json().isEx) {
                    if(res.json().kickout){
                        // this.route.navigate(['/']);
                        this.loading = false;
                    }else{
                        if (res.json().data) {
                            // Server 回傳錯誤
                            if (res.json().data && res.json().data.errorFlagName) {
                                var flagName = res.json().data.errorFlagName;
                                this.idToGoFlow = flagName;
                            }
                        }
                        this.loading = false;
                        var msgs = res.json().msgs;
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        this.AlertTXT = msgs;
                        document.querySelector('#myModal').scrollIntoView();
                    }
                    return false;
                } else{
                    return res.json();
                }
            });
            i.subscribe((item)=>{
            console.log(item['status']); 
            if(item['status'] == 'ok'){
                var userAgent = window.navigator.userAgent;
                if (userAgent.match(/iPhone/i)) {
                    this.route.navigate(['travel/gogoout/confirm'], {queryParams: {orderNumber: this.gogoOrderNumber, reload: true}});
                } else {
                    this.route.navigate(['travel/gogoout/confirm'], {queryParams: {orderNumber: this.gogoOrderNumber}});
                }
                this.loading = false;
            } else {
            }
            });
        }, 400);
    }

    getGoGoConfirmInfo() {
        this.loading = true;
        if(this.orderNumberForSave) {
            let objSendBak = {};
            objSendBak['orderNumber'] = this.orderNumberForSave;
            return this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/confirm/initData', objSendBak).map(res => {
                this.loading = false;
                console.log(res.json());
                return res.json();
            });
        }else{
            // this.route.navigate(['/index']);
        }
    }

    getConfirmInfo(val:any) {
        this.orderNumberForSave = val;
        this.gogoOrderNumber = val;
        this.orderNumber = val;
        this.loading = true;
        let objSendBak = {};
        objSendBak['orderNumber'] = val;
        return this.http.post('/CareLineTravel/travel-mbr/journey/getData4ConfirmPage', objSendBak).map(res => {
            this.loading = false;
            return res.json();
        });
    }

    confirmPaying(value){
        console.log(this.orderNumberForSave);
        this.loading = true;
        let objSendBak = {};
        objSendBak['orderNumber'] = this.orderNumberForSave;
        objSendBak['kycSelections'] = value;
        this.http.post('/CareLineTravel/travel-mbr/journey/validateBeforePayment', objSendBak).map(res => {
            return res.text();
        }).pipe(
            timeout(35000),
            catchError(error => of(`系統短暫忙碌, 請重新點選確認。`))
          ).subscribe(
            (item) => { 
            if(item == 'ok'){
                this.loading = true;
                window.location.href = '/CareLineTravel/travel-mbr/journey/goToPayment?orderNumber=' +  encodeURIComponent(this.orderNumberForSave);
            } else {
                if(item == '系統短暫忙碌, 請重新點選確認。') {
                    this.loading = false;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = ['系統短暫忙碌, 請重新點選確認。'];
                    document.querySelector('#myModal').scrollIntoView();
                } else {
                    let replyObj = JSON.parse(item);
                    if(replyObj.isEx){
                        if(replyObj.kickout){
                            this.route.navigate(['travel']);
                        } else {
                            if (replyObj.data) {
                                // Server 回傳錯誤
                                if (replyObj.data && replyObj.data.errorFlagName) {
                                    var flagName = replyObj.data.errorFlagName;
                                    this.idToGoFlow = flagName;
                                }
                            }
                            this.loading = false;
                            var msgs = replyObj.msgs;
                            var modal = document.getElementById('myModal');
                            modal.style.display = "block";
                            this.AlertTXT = msgs;
                            document.querySelector('#myModal').scrollIntoView();
                        }
                    } else {
                        if (replyObj.data) {
                            // Server 回傳錯誤
                            if (replyObj.data && replyObj.data.errorFlagName) {
                                var flagName = replyObj.data.errorFlagName;
                                this.idToGoFlow = flagName;
                            }
                        }
                        this.loading = false;
                        var msgs = replyObj.msgs;
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        this.AlertTXT = msgs;
                        document.querySelector('#myModal').scrollIntoView();
                    }
                }
            }
        });
    }

    getCustomerHomePage() {
        this.loading = true;
        let objSendBak = {};
        objSendBak['orderNumber'] = this.orderNumberForSave;
        return this.http.post('/CareLineTravel/travel-mbr/journey/getData4BackFromSaveInsuredData', objSendBak).map(res => {
            this.loading = false;
            console.log(res.json());
            return res.json();
        })
    }

    getActImgUrl(value) {
        let objSendBak = {};
        objSendBak['orderNumber'] = this.orderNumberForSave;
        return this.http.post('/CareLineTravel/travel-mbr/journey/getData4ThanksPage', objSendBak).map(res => res.text());
    }

    toGoPdfPage(val){
        var postData;
        if(val){
         postData = {"orderNumber": val};   
        }else{
         postData = {"orderNumber": this.gogoOrderNumber};   
        }
        this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/sign/next', postData).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.loading = false;
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
            return res.json(); 
            }
        }).subscribe((item)=>{
            if(item.status == 'ok'){
                this.route.navigate(['travel/gogoout/previewPdf'], {queryParams: {orderNumber: postData['orderNumber']}});
            }
        });
    }

    getPdf(val){
        var postData;
        if(val){
         postData = {"orderNumber": val};   
        }else{
         postData = {"orderNumber": this.gogoOrderNumber};   
        }
        return this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/previewPolicyDoc/initData', postData).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.loading = false;
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
            return res.json(); 
            }
        })
    }

    completeFunPreview(val){
        var postData;
        if(val){
         postData = {"orderNumber": val};
        }else{
         postData = {"orderNumber": this.gogoOrderNumber};
        }
        if(postData['orderNumber']){
            window.location.href = '/CareLineTravel/travel-mbr/b2bCar/gogoout/previewPolicyDoc/next?orderNumber='+ 
            encodeURIComponent(postData['orderNumber']);
        }
    }

    uploadSignature(postParam){
       return this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/sign/upload', postParam).map(res => {
            if (res.json().isEx) {
                if(res.json().kickout){
                    this.loading = false;
                }else{
                    if (res.json().data) {
                        // Server 回傳錯誤
                        if (res.json().data && res.json().data.errorFlagName) {
                            var flagName = res.json().data.errorFlagName;
                            this.idToGoFlow = flagName;
                        }
                    }
                    this.loading = false;
                    var msgs = res.json().msgs;
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    this.AlertTXT = msgs;
                    document.querySelector('#myModal').scrollIntoView();
                }
                return false;
            } else {
            return res.json(); 
            } 
        });
    }

    gogoCancelBak(val){
        var postData;
        if(val){
         postData = {"orderNumber": val};
        }else{
         postData = {"orderNumber": this.gogoOrderNumber};
        }
        if(postData['orderNumber']){
            window.location.href = '/CareLineTravel/travel-mbr/b2bCar/gogoout/cancel/next?orderNumber='+
            encodeURIComponent(postData['orderNumber']);
        } 
    }

}

