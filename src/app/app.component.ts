import {Component} from '@angular/core';
import {DataServiceService} from '../../src/app/services/data-service.service';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean = false;

  constructor(
    public dataService: DataServiceService
  ) {
  }
  ngOnInit() {
    this.detectScrollAndHeaderChange();
  }

  AlertArr(){
    return this.dataService.AlertTXT;
  }

  ngAfterViewInit() {
    // this.detectScrollAndHeaderChange();
  }


  ifItsLoading(){
      this.loading = this.dataService.loading;
      return this.loading;
  }

  cancelThisModal(id){
    if(id){
        document.querySelector('#'+id).scrollIntoView();
        this.dataService.idToGoFlow = '';
    }
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }

  canceltimeAdjTxtAreaModal(){
    $('#timeAdjTxtArea').empty();
    var modal = document.getElementById('timeAdjTxtAreaModal');
    modal.style.display = "none";
  }

  detectScrollAndHeaderChange() {
   $(document).on('scroll', function(){
     if($(document).scrollTop() > 400){
       $('.navbar.navbar-expand-xl.fixed-top.navbar-default.navbar-mobile-inverse.navbar-light.navbar-light-shadow').css({
         'position': 'fixed'
       });
     } else {
       $('nav').css({
         'position': 'inline-block'
       });
     }
   });
  }
}
