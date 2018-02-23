import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-router-jumper',
  templateUrl: './router-jumper.component.html',
  styleUrls: ['./router-jumper.component.css']
})
export class RouterJumperComponent implements OnInit {

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    const url = this.router.url;
    if (url.slice(7, 15) === '/gogoout'){
      this.router.navigate(['travel/gogoout']);
    }else if (url.slice(0, 8) === '/RentCar'){
      this.router.navigate(['RentCar/BtoBtoC/']);
    } else {
      this.router.navigate(['/travel']);
    }
  }

}
