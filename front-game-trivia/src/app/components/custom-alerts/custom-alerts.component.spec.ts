import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertsComponent } from './custom-alerts.component';

describe('CustomAlertsComponent', () => {
  let component: CustomAlertsComponent;
  let fixture: ComponentFixture<CustomAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertsComponent]
    });
    fixture = TestBed.createComponent(CustomAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
