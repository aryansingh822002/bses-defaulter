import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionMasterComponent } from './commission-master.component';

describe('CommissionMasterComponent', () => {
  let component: CommissionMasterComponent;
  let fixture: ComponentFixture<CommissionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
