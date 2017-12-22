import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-temp-fake',
  templateUrl: './temp-fake.component.html',
  styleUrls: ['./temp-fake.component.css']
})

export class TempFakeComponent implements OnInit {

  constructor(private shareService:ShareService) {
      $('html, body').animate({scrollTop: '0px'}, 0);
  }

  ngOnInit() {
  }

  buttonOne(){
    this.shareService.buttonOneClick();
  }

  buttonTwo(){
    this.shareService.buttonTwoClick();
  }

  buttonThree(){
    this.shareService.buttonThreeClick();
  }
}
