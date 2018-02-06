import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Version } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DataServiceService } from './services/data-service.service';
import { filterPipe } from './filter';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { AccordionModule } from 'ngx-accordion';

import { SuiSelectModule } from 'ng2-semantic-ui';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConfirmInfoComponent } from './components/confirm-info/confirm-info.component';

import * as $ from 'jquery';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMockDbService } from './mock-packageList';
import { ShareService } from "./services/share.service";
import { ThanksComponent } from './components/thanks/thanks.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { FailPaymentComponent } from './components/fail-payment/fail-payment.component';
import { LoadingModule } from 'ngx-loading';
import { LayoutModule } from 'cl-layout/src/app/shared/layout/layout.module';
import 'cl-layout/thirdparty-library';
import { CarelineProjectType } from 'cl-layout/src/app/shared/layout/careline-layout-config';
import { OwlCarouselModule } from 'cl-layout/src/app/shared/tools/owl-carousel/owl-carousel.module';
import { VersionComponent } from './components/version/version.component';
import { RentalCarThemeModule } from './shared/theme/rental-car-theme/rental-car-theme.module';
import { LayoutRoute } from 'cl-layout/src/app/shared/layout/layout';
import { RentalCarThemeFactoryFactory } from './shared/theme/rental-car-theme/rental-car-theme-factory';
import { PreviewPdfComponent } from './components/preview-pdf/preview-pdf.component';
import { SignatureModule } from './components/signature/signature.module';
import { SignatureComponent } from './components/signature/signature.component';
import { GogooutErrorComponent } from './components/gogoout-error/gogoout-error.component';
import { GogooutCancelComponent } from './components/gogoout-cancel/gogoout-cancel.component';
import { SharedDirectiveModule } from 'cl-layout/src/app/shared/directive/shared-directive.module';
import { BtobtoCComponent } from './components/btobtoc/btobtoc.component';
import { RentalCarServiceService } from './services/rental-car-service.service';
export const routes: LayoutRoute[] = [
  {
    path: 'travel/gogoout',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: '首頁',
    },
    component: MemberCreateComponent
  },
  {
    path: 'travel/gogooutError',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: 'gogo error',
    },
    component: GogooutErrorComponent
  },
  {
    path: 'travel/gogooutCancel',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: 'gogo error',
    },
    component: GogooutCancelComponent
  },
  {
    path: 'travel/gogoout/confirm',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: 'gogo確認投保資訊',
    },
    component: ConfirmInfoComponent
  },
  {
    path: 'travel/gogoout/signature',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: 'gogo signature',
    },
    loadChildren: './components/signature/signature.module#SignatureModule',
    // component: SignatureGoGooutComponent
  },
  {
    path: 'travel/gogoout/previewPdf',
    data: {
      component: {
        factory: RentalCarThemeFactoryFactory
      }
      // breadcrumb: 'gogo pdf preview',
    },
    component: PreviewPdfComponent
  },
  {
    path: '',
    data: {
      // breadcrumb: '首頁',
    },
    component: HomePageComponent
  },
  {
    path: 'travel',
    data: {
      // breadcrumb: '首頁',
    },
    component: HomePageComponent
  },
  {
    path: 'travel/index',
    data: {
      // breadcrumb: '首頁',
    },
    component: HomePageComponent
  },
  {
    path: 'travel/memberCreate',
    data: {
      // breadcrumb: '會員',
    },
    component: MemberCreateComponent
  },
  {
    path: 'travel/confirmPage',
    data: {
      // breadcrumb: '確認投保資訊',
    },
    component: ConfirmInfoComponent
  },
  {
    path: 'travel/thanksPage',
    data: {
      // breadcrumb: '投保感謝',
    },
    component: ThanksComponent
  },
  {
    path: 'travel/failPayment',
    data: {
      // breadcrumb: '付款失敗',
    },
    component: FailPaymentComponent
  },
  {
    path: 'version',
    data: {
      // breadcrumb: '檢查版本',
    },
    component: VersionComponent
  },
  {
    path: 'RentCar/BtoBtoC',
    data: {
      // breadcrumb: '檢查版本',
    },
    component: BtobtoCComponent
  }
];

@NgModule({
  declarations: [
    AddMemberComponent,
    filterPipe,
    AppComponent,
    MemberCreateComponent,
    HomePageComponent,
    ConfirmInfoComponent,
    ThanksComponent,
    FailPaymentComponent,
    VersionComponent,
    PreviewPdfComponent,
    GogooutErrorComponent,
    GogooutCancelComponent,
    BtobtoCComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    LayoutModule.forRoot({
      carelineProjectType: CarelineProjectType.travel
    }),
    // BreadcrumbsModule,
    OwlCarouselModule,
    ReactiveFormsModule,
    LoadingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MomentModule,
    // InMemoryWebApiModule.forRoot(InMockDbService),
    AccordionModule,
    HttpModule,
    SuiSelectModule,
    RentalCarThemeModule,
    SharedDirectiveModule
  ],
  providers: [
    DataServiceService,
    ShareService,
    RentalCarServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
