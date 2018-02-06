import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtobtoCComponent } from './btobtoc.component';

describe('BtobtoComponent', () => {
  let component: BtobtoCComponent;
  let fixture: ComponentFixture<BtobtoCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtobtoCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtobtoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
