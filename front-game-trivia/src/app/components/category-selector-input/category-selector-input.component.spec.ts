import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectorInputComponent } from './category-selector-input.component';

describe('CategorySelectorInputComponent', () => {
  let component: CategorySelectorInputComponent;
  let fixture: ComponentFixture<CategorySelectorInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySelectorInputComponent]
    });
    fixture = TestBed.createComponent(CategorySelectorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
