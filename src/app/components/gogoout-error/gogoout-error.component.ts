import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gogoout-error',
  templateUrl: './gogoout-error.component.html',
  styleUrls: ['./gogoout-error.component.css']
})
export class GogooutErrorComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute
  ) { 
    $('html, body').animate({scrollTop: '0px'}, 0);
  }

  text:string = '';
  ngOnInit() {
    this.text = this.actRoute.queryParams['value']['msg'].replace(new RegExp("\\+", 'g'), " ");
  }

  goBack() {
    window.history.back();
  }
}
