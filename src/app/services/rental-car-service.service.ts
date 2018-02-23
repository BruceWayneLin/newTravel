import { Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Injectable()
export class RentalCarServiceService {
  idToGoFlow: any;
  public AlertTXT: any;

  constructor(
    private dataService: DataServiceService,
    private http: Http,
    private route: Router
  ) { 
  }

  getIniData(val) {
    this.dataService.loading = true;
    return this.http.get('/CareLineTravel/travel-mbr/journey/initData?product=' + val['product'] + '&source=' + val['source'] + '&pack=' + val['pack']
    ).map(res => {
        this.dataService.loading = false;
        return res.json();
    });
  }

  RentalCarIsGoingToInusre(value) {
    console.log(JSON.stringify(value));
    const i = this.http.post('/CareLineTravel/travel-mbr/journey/savePackage', value).map(res => {
        if (res.json().isEx) {
            if(res.json().kickout){
                this.route.navigate(['RentCar/BtoBtoC']);
            }else{
                if (res.json().data) {
                    // Server 回傳錯誤
                    if (res.json().data && res.json().data.errorFlagName) {
                        const flagName = res.json().data.errorFlagName;
                        this.dataService.idToGoFlow = flagName;
                    }
                }
                this.dataService.loading = false;
                var msgs = res.json().msgs;
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                this.dataService.AlertTXT = msgs;
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
            this.dataService.loading = true;
            window.location.href = '/CareLineTravel/travel-mbr/journey/loginMember?orderNumber=' + encodeURIComponent(item)+ '?' + timeStampInMs;
        }
    });
  }
}
