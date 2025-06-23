import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationDetailPage } from './destination-detail.page';

describe('DestinationDetailPage', () => {
  let component: DestinationDetailPage;
  let fixture: ComponentFixture<DestinationDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
