import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GogooutErrorComponent } from './gogoout-error.component';

describe('GogooutErrorComponent', () => {
  let component: GogooutErrorComponent;
  let fixture: ComponentFixture<GogooutErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GogooutErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GogooutErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
