import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalCarHeaderComponent } from './rental-car-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RentalCarHeaderComponent],
  entryComponents: [
    RentalCarHeaderComponent
  ]
})
export class RentalCarHeaderModule { 
  time:any;
  constructor(){
    this.time = new Date().getTime();
  }
}
