import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterJumperComponent } from './router-jumper.component';

describe('RouterJumperComponent', () => {
  let component: RouterJumperComponent;
  let fixture: ComponentFixture<RouterJumperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterJumperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterJumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
