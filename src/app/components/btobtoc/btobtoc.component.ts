import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { RentalCarServiceService } from '../../services/rental-car-service.service';


@Component({
  selector: 'app-btobtoc',
  templateUrl: './btobtoc.component.html',
  styleUrls: ['./btobtoc.component.css']
})
export class BtobtoCComponent implements OnInit {
  images: Array<any> = [];

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
    returnObj['source'] = this.routerAct.queryParams['value']['source'];
    returnObj['pack'] = this.routerAct.queryParams['value']['pack'];

    this.rentalCarService.getIniData(returnObj).subscribe((item)=>{
      console.log(item);
    });


  }

}
