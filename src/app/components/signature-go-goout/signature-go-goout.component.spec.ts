import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureGoGooutComponent } from './signature-go-goout.component';

describe('SignatureGoGooutComponent', () => {
  let component: SignatureGoGooutComponent;
  let fixture: ComponentFixture<SignatureGoGooutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureGoGooutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureGoGooutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
