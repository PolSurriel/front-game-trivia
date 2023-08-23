// Angular core imports
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-amount-input',
  templateUrl: './question-amount-input.component.html',
  styleUrls: ['./question-amount-input.component.scss']
})
export class QuestionAmountInputComponent {

  // Default value to represent the selected number of questions
  protected radioModel = '5';

  // Output event to notify parent components of a change in the selected number of questions
  @Output() onQuestionAmountChange = new EventEmitter<number>();

  // Component's constructor
  constructor() { }

  // Method to emit the number of questions selected by the user
  protected setQuestionAmount(amount: number) {
    this.onQuestionAmountChange.emit(amount);
  }

}
