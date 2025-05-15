import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyMappingMasterComponent } from './agency-mapping-master.component';

describe('AgencyMappingMasterComponent', () => {
  let component: AgencyMappingMasterComponent;
  let fixture: ComponentFixture<AgencyMappingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyMappingMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyMappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
