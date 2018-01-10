import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bCarGogooutComponent } from './b2b-car-gogoout.component';

describe('B2bCarGogooutComponent', () => {
  let component: B2bCarGogooutComponent;
  let fixture: ComponentFixture<B2bCarGogooutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bCarGogooutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bCarGogooutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
