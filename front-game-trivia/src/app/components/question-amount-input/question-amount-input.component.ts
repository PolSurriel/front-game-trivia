import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-question-amount-input',
  templateUrl: './question-amount-input.component.html',
  styleUrls: ['./question-amount-input.component.scss']
})
export class QuestionAmountInputComponent {
  radioModel = '5';

  @Output() onQuestionAmountChange = new EventEmitter<number>();

  constructor() { }

  setQuestionAmount(amount : number) {
    this.onQuestionAmountChange.emit(amount);
  }


}
