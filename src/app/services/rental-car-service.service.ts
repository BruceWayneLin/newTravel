import { Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { Http } from '@angular/http';
declare var jquery:any;
declare var $ :any;

@Injectable()
export class RentalCarServiceService {

  constructor(
    private dataService: DataServiceService,
    private http: Http
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
}
