import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanTripPage } from './plan-trip.page';

describe('PlanTripPage', () => {
  let component: PlanTripPage;
  let fixture: ComponentFixture<PlanTripPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
