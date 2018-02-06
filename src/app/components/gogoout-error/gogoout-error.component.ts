import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gogoout-error',
  templateUrl: './gogoout-error.component.html',
  styleUrls: ['./gogoout-error.component.css']
})
export class GogooutErrorComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    window.scrollTo(0, 0);
    $('html, body').animate({scrollTop: '0px'}, 0);
  }

  text:string = '';
  ngOnInit() {
    if(this.actRoute.queryParams['value']['msg']){
    }else{
      this.router.navigate(['travel']);
    }
    this.text = this.actRoute.queryParams['value']['msg'].replace(new RegExp("\\+", 'g'), " ");
  }

  goBack() {
    window.location.href = 'https://gogoout.com/';
  }
}
