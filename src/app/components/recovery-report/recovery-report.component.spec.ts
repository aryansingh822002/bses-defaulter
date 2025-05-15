import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryReportComponent } from './recovery-report.component';

describe('RecoveryReportComponent', () => {
  let component: RecoveryReportComponent;
  let fixture: ComponentFixture<RecoveryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
