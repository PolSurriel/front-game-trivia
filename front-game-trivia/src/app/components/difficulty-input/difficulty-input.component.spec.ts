import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyInputComponent } from './difficulty-input.component';

describe('DifficultyInputComponent', () => {
  let component: DifficultyInputComponent;
  let fixture: ComponentFixture<DifficultyInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultyInputComponent]
    });
    fixture = TestBed.createComponent(DifficultyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
