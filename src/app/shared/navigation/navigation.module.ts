import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLogoutTravelService } from './nav-logout-travel.service';
import { NavLogoutService } from 'cl-layout/src/app/shared/layout/navigation/plugins/nav-logout.serverice';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: NavLogoutService, useClass: NavLogoutTravelService }
  ]
})
export class NavigationModule { }
