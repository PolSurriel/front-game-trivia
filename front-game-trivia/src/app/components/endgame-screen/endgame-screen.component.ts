import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-endgame-screen',
  templateUrl: './endgame-screen.component.html',
  styleUrls: ['./endgame-screen.component.scss']
})
export class EndgameScreenComponent {

  correctAmount : number = 3;
  totalAmount : number = 5;
  percentageCorrect : number = 60;
  @Input() gameHistory : any;

  @Output() onGoBackEvent = new EventEmitter<void>();

  ngOnInit() {
    console.log(this.gameHistory);
    this.totalAmount = this.gameHistory.questions.length;
    this.correctAmount = 0;
    for (const question of this.gameHistory.questions) {
      if(question.correctAnswer.id == question.chosenAnswer.id) {
        this.correctAmount++;
      }
    }
    this.percentageCorrect = Math.round((this.correctAmount / this.totalAmount) * 100);
  }

  onGoBack(){
    this.onGoBackEvent.emit();
  }

}
