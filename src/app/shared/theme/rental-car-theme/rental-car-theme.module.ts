import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalCarThemeFactoryFactory } from './rental-car-theme-factory';
import { RentalCarHeaderModule } from './rental-car-header/rental-car-header.module';
import { RentalCarFooterModule } from './rental-car-footer/rental-car-footer.module';

@NgModule({
  imports: [
    CommonModule,
    RentalCarHeaderModule,
    RentalCarFooterModule
  ],
  declarations: [],
  providers: [
    RentalCarThemeFactoryFactory
  ]
})
export class RentalCarThemeModule { }
