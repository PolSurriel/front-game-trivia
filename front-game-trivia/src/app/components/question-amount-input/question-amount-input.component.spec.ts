import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAmountInputComponent } from './question-amount-input.component';

describe('QuestionAmountInputComponent', () => {
  let component: QuestionAmountInputComponent;
  let fixture: ComponentFixture<QuestionAmountInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAmountInputComponent]
    });
    fixture = TestBed.createComponent(QuestionAmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
