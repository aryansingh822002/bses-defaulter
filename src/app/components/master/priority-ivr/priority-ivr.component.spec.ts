import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityIVRComponent } from './priority-ivr.component';

describe('PriorityIVRComponent', () => {
  let component: PriorityIVRComponent;
  let fixture: ComponentFixture<PriorityIVRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityIVRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityIVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
