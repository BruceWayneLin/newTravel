import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GogooutCancelComponent } from './gogoout-cancel.component';

describe('GogooutCancelComponent', () => {
  let component: GogooutCancelComponent;
  let fixture: ComponentFixture<GogooutCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GogooutCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GogooutCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
