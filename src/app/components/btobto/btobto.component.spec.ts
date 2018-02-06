import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtobtoComponent } from './btobto.component';

describe('BtobtoComponent', () => {
  let component: BtobtoComponent;
  let fixture: ComponentFixture<BtobtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtobtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtobtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
