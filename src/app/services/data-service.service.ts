import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import {routes} from "../app.module";
declare var jquery:any;
declare var $ :any;

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
                    this.route.navigate(['/']);
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
        console.log('12342424214214324124', this.gogoOrderNumber);
            try{
            if(this.gogoOrderNumber){
                sessionStorage.setItem('pid', JSON.stringify(this.gogoOrderNumber));  
            }  
            }catch(error){

            }
        if(this.route.url.slice(0, 8) == '/gogoout'){
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

    getPkPrice(value) {
        this.loading = true;
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // let options = new RequestOptions({headers});
        // let  body = new URLSearchParams();
        // body.append('packageId', value['packageId']);
        // body.append('days', value['days']);

        return this.http.post('/CareLineTravel/travel-mbr/journey/calRateByPackage', value)
        .map((result) => {
            if(result.json().isEx == true){
                if(result.json().kickout){
                    this.route.navigate(['/']);
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
        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // let options = new RequestOptions({headers});
        // let  body = new URLSearchParams();
        // body.append('packageId', value['packageId']);
        // body.append('days', value['days']);
        // body.append('cusItemJson', value['cusItemJson']);
        // console.log(JSON.stringify(value));

        return this.http.post('/CareLineTravel/travel-mbr/journey/calRateByCusPackage', value)
        .map((result) => {
            if(result.json().isEx == true){
                if(result.json().kickout){
                    this.route.navigate(['/']);
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
                    this.route.navigate(['/']);
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
        this.loading = true;
        console.log(this.route.url.slice(0, 8));
        if(this.backFromConfirm){
            let objSendBak = {};
            objSendBak['orderNumber'] = this.orderNumberForSave;
            return this.http.post('/CareLineTravel/travel-mbr/journey/getDataAfterLogin', objSendBak).map(res => {
                if(res.json().isEx){
                    if(res.json().kickout){
                        this.route.navigate(['/']);
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
            objSendBak['orderNumber'] = this.orderNumberForSave;
            return this.http.post('/CareLineTravel/travel-mbr/journey/getDataAfterLogin', objSendBak).map(res => {
                if(res.json().isEx){
                    if(res.json().kickout){
                        this.route.navigate(['/']);
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

    toGetBakInfo() {
            this.loading = true;
            if(this.backFromConfirm) {
                let objSendBak = {};
                objSendBak['orderNumber'] = this.orderNumberForSave;
                return this.http.post('/CareLineTravel/travel-mbr/journey/getDataWhenBackFromConfirmPage', objSendBak).map(res => {
                    if(res.json().isEx){
                        if(res.json().kickout){
                            this.route.navigate(['/']);
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
                    this.route.navigate(['/']);
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
                    this.route.navigate(['/']);
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
        console.log('132421343214233', this.SaveInsuredData);
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
                        this.route.navigate(['/']);
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
                    this.route.navigate(['/confirmPage']);
                    this.loading = false;
                } else {
                    // this.loading = false;
                    // let replyObj = JSON.parse(item);
                    // if(replyObj.isEx){
                    //     if(replyObj.kickout){
                    //         this.route.navigate(['/']);
                    //     }else{
                    //         if (replyObj.json().data) {
                    //             // Server 回傳錯誤
                    //             if (replyObj.data && replyObj.json().data.errorFlagName) {
                    //                 var flagName = replyObj.json().data.errorFlagName;
                    //                 this.idToGoFlow = flagName;
                    //             }
                    //         }
                    //         this.loading = false;
                    //         var msgs = replyObj.msgs;
                    //         var modal = document.getElementById('myModal');
                    //         modal.style.display = "block";
                    //         this.AlertTXT = msgs;
                    //         document.querySelector('#myModal').scrollIntoView();
                    //     }
                    // }else{
                    //     if (replyObj.data) {
                    //         // Server 回傳錯誤
                    //         if (replyObj.json().data && replyObj.json().data.errorFlagName) {
                    //             var flagName = replyObj.json().data.errorFlagName;
                    //             this.idToGoFlow = flagName;
                    //         }
                    //     }
                    //     this.loading = false;
                    //     var msgs = replyObj.msgs;
                    //     var modal = document.getElementById('myModal');
                    //     modal.style.display = "block";
                    //     this.AlertTXT = msgs;
                    //     document.querySelector('#myModal').scrollIntoView();
                    // }
                }
            });
        }, 400);
    }

    toGoNextFromConfirm(){
        this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/confirm/next', {"orderNumber": this.gogoOrderNumber}).map(res => {
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
                this.route.navigate(['gogoout/signature'], {queryParams: {orderNumber: this.gogoOrderNumber}});
            }
        });
    }

    toCallGoGoApi(data){
        this.loading = true;
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
                this.route.navigate(['/gogoout/confirm'], {queryParams: {orderNumber: this.gogoOrderNumber}});
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

    getConfirmInfo() {
        this.loading = true;
        if(this.orderNumberForSave) {
            let objSendBak = {};
            objSendBak['orderNumber'] = this.orderNumberForSave;
            return this.http.post('/CareLineTravel/travel-mbr/journey/getData4ConfirmPage', objSendBak).map(res => {
                this.loading = false;
                console.log(res.json());
                return res.json();
            });
        }else{
            this.route.navigate(['/index']);
        }
    }

    confirmPaying(){
        console.log(this.orderNumberForSave);
        this.loading = true;
        let objSendBak = {};
        objSendBak['orderNumber'] = this.orderNumberForSave;
        this.http.post('/CareLineTravel/travel-mbr/journey/validateBeforePayment', objSendBak).map(res => {
            return res.text();
        }).subscribe((item) => {
            if(item == 'ok'){
                this.loading = true;
                window.location.href = '/CareLineTravel/travel-mbr/journey/goToPayment?orderNumber=' +  encodeURIComponent(this.orderNumberForSave);
            } else {
                let replyObj = JSON.parse(item);
                if(replyObj.isEx){
                    if(replyObj.kickout){
                        this.route.navigate(['/']);
                    }else{
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
                }else{
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
                this.route.navigate(['gogoout/previewPdf'], {queryParams: {orderNumber: postData['orderNumber']}});
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
        this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/previewPolicyDoc/next?orderNumber='+postData['orderNumber'], '').map(
            res => {
                window.location.href = 'https://gogoout.com/';
        }).subscribe((item)=>{
        });
    }

    uploadSignature(postParam){
        this.http.post('/CareLineTravel/travel-mbr/b2bCar/gogoout/sign/upload', postParam).map(res => {
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
            console.log(item);
        }); 
    }

}

