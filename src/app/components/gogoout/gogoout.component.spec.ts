import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GogooutComponent } from './gogoout.component';

describe('GogooutComponent', () => {
  let component: GogooutComponent;
  let fixture: ComponentFixture<GogooutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GogooutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GogooutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
