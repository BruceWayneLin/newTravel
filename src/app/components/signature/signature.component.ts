import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SignatureService } from './signature.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataServiceService } from '../../services/data-service.service'
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
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private signatureService: SignatureService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .switchMap((queryParams) => {
        var orderNumber;
        if(!queryParams[this.signatureService.routingKey.queryParam.orderNumber]){
          try{
            orderNumber = sessionStorage.getItem('pid');
          }catch(error){
            orderNumber = this.dataService.gogoOrderNumber;
          }
          if (!orderNumber) {
            return Observable.of(null);
          }
        }else{
          orderNumber = queryParams[this.signatureService.routingKey.queryParam.orderNumber];
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

  goToPreviewPdfPage(){
    console.log('4321424routerouterpdf', this.activatedRoute.queryParams['value']['orderNumber']);
    this.dataService.toGoPdfPage(this.activatedRoute.queryParams['value']['orderNumber']);
  }

  goPreviouslyStep(){
    this.router.navigate(['gogoout/confirm'], {queryParams: {orderNumber: this.activatedRoute.queryParams['value']['orderNumber']}});
  }

}
