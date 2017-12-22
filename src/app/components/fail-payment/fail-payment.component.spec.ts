import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailPaymentComponent } from './fail-payment.component';

describe('FailPaymentComponent', () => {
  let component: FailPaymentComponent;
  let fixture: ComponentFixture<FailPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
