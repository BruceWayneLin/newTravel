import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignatureRoutingModule } from './signature-routing.module';
import { SignatureComponent } from './signature.component';
import { SignatureService } from './signature.service';
import { SignatureInputModule } from 'cl-layout/src/app/shared/tools/cl-signature/signature-input/signature-input.module';
import { SharedComponentModule } from 'cl-layout/src/app/shared/component/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    SignatureInputModule,
    SignatureRoutingModule
  ],
  providers: [
    SignatureService
  ],
  declarations: [
    SignatureComponent,
  ]
})
export class SignatureModule { }
