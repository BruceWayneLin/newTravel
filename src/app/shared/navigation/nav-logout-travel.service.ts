import { Injectable } from '@angular/core';
import { CarelineNavigationBaseService } from 'cl-layout/src/app/shared/layout/navigation/careline-navigation-base.service';

@Injectable()
export class NavLogoutTravelService {

  private prefixUrlPath = {
    default: 'travel',
    btoBtoC: 'RentCar/BtoBtoC',
    homePage: ''
  };

  constructor(
    private navBaseService: CarelineNavigationBaseService
  ) {
   }

  click() {
    if (this.isInBtoBtoC()) {
      location.href = `/`;
    } else {
      location.href = `${this.navBaseService.prefixUrlPath.travle}/${this.prefixUrlPath.default}`;
    }
  }

  private isInBtoBtoC() {
    return location.href.indexOf(this.prefixUrlPath.btoBtoC) > -1;
  }
}
