import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionOfficeComponent } from './division-office.component';

describe('DivisionOfficeComponent', () => {
  let component: DivisionOfficeComponent;
  let fixture: ComponentFixture<DivisionOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
