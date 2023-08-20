import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionContentComponent } from './question-content.component';

describe('QuestionContentComponent', () => {
  let component: QuestionContentComponent;
  let fixture: ComponentFixture<QuestionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionContentComponent]
    });
    fixture = TestBed.createComponent(QuestionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
