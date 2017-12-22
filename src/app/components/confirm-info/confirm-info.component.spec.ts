import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmInfoComponent } from './confirm-info.component';

describe('ConfirmInfoComponent', () => {
  let component: ConfirmInfoComponent;
  let fixture: ComponentFixture<ConfirmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
