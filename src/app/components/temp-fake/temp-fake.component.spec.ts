import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFakeComponent } from './temp-fake.component';

describe('TempFakeComponent', () => {
  let component: TempFakeComponent;
  let fixture: ComponentFixture<TempFakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempFakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
