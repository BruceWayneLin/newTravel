import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gogoout-error',
  templateUrl: './gogoout-error.component.html',
  styleUrls: ['./gogoout-error.component.css']
})
export class GogooutErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }
}
