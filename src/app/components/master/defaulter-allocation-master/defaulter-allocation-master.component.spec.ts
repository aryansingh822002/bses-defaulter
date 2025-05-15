import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulterAllocationMasterComponent } from './defaulter-allocation-master.component';

describe('DefaulterAllocationMasterComponent', () => {
  let component: DefaulterAllocationMasterComponent;
  let fixture: ComponentFixture<DefaulterAllocationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaulterAllocationMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaulterAllocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
