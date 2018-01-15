import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SignatureService } from './signature.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SignaturePeopleViewModel } from 'cl-layout/src/app/shared/tools/cl-signature/signature-pad/signature-pad';
import { SignatureInputComponent } from 'cl-layout/src/app/shared/tools/cl-signature/signature-input/signature-input.component';

@Component({
  selector: 'cl-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {


  signaturePeopleList = [] as SignaturePeopleViewModel[];

  private signatureInstance = {
    prev: {} as SignatureInputComponent,
    next: {} as SignatureInputComponent,
  };

  public current = {
    orderNumber: null as string
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private signatureService: SignatureService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .switchMap((queryParams) => {
        const orderNumber = queryParams[this.signatureService.routingKey.queryParam.orderNumber];
        if (!orderNumber) {
          return Observable.of(null);
        }
        this.current.orderNumber = orderNumber;

        return this.signatureService.getList({
          orderNumber: orderNumber
        });
      })
      .subscribe((signInfoList) => {
        if (!signInfoList) {
          return;
        }

        this.signaturePeopleList = signInfoList;
      });
  }


  signature(input: SignatureInputComponent) {

    if (this.signatureInstance.prev.unActive) {
      this.signatureInstance.prev.unActive();
    }
    //
    this.signatureInstance.next = input;
    this.signatureInstance.next.active();
    //
    this.signatureInstance.prev = this.signatureInstance.next;
  }

}
