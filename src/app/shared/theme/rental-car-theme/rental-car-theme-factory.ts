import { Injectable } from '@angular/core';
import { LayoutDataSetting } from 'cl-layout/src/app/shared/layout/layout';
import { RentalCarFooterComponent } from './rental-car-footer/rental-car-footer.component';
import { RentalCarHeaderComponent } from './rental-car-header/rental-car-header.component';
import { Footer } from 'cl-layout/src/app/shared/layout/footer/footer';

@Injectable()
export class RentalCarThemeFactoryFactory implements LayoutDataSetting.DynamicSwitchedComponent {

  constructor() { }
  getHeaderComponent() {
    // use customized header component
    return RentalCarHeaderComponent;

    // use default header component when you return null
    // return null;
  }
  getFooterComponent() {
    // use customized header component
    // return RentalCarFooterComponent;

    // use default footer component when you return null
    // return null;

    // use default footer component with the display set to hidden some component
    const defulatFooterDisplaySetting: Footer.DisplaySetting = {
      quickLink: false,
      commonLink: false,
      contactUs: {
        customerService: false,
      }
    };
    return defulatFooterDisplaySetting;
  }
}
