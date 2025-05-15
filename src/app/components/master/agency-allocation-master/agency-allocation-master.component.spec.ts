import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAllocationMasterComponent } from './agency-allocation-master.component';

describe('AgencyAllocationMasterComponent', () => {
  let component: AgencyAllocationMasterComponent;
  let fixture: ComponentFixture<AgencyAllocationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAllocationMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAllocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
