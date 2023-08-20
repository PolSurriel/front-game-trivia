import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSectionComponent } from './pop-up-section.component';

describe('PopUpSectionComponent', () => {
  let component: PopUpSectionComponent;
  let fixture: ComponentFixture<PopUpSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpSectionComponent]
    });
    fixture = TestBed.createComponent(PopUpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
