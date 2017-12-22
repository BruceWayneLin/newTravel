import { Injectable } from '@angular/core';
@Injectable()

export class ShareService {
  buttonOne: boolean = false;
  buttonTwo: boolean = false;
  buttonThree: boolean = false;

  constructor(
  ) {
  }

  buttonOneClick() {
    this.buttonOne = true;
    this.buttonTwo = false;
    this.buttonThree = false;
  }

  buttonTwoClick() {
    this.buttonOne = false;
    this.buttonTwo = true;
    this.buttonThree = false;
  }

  buttonThreeClick() {
    this.buttonOne = false;
    this.buttonTwo = false;
    this.buttonThree = true;
  }

}
