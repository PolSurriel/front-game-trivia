import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionScreenComponent } from './question-screen.component';

describe('QuestionScreenComponent', () => {
  let component: QuestionScreenComponent;
  let fixture: ComponentFixture<QuestionScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionScreenComponent]
    });
    fixture = TestBed.createComponent(QuestionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
