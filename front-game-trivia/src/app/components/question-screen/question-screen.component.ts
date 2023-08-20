import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatchClientService } from 'src/app/services/match-client.service';
import { ActionButtonComponent } from '../action-button/action-button.component';


@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {

  @Input() questionAmount : number;
  @Input() question : string;
  @Input() questionIndex : number;
  @Input() gameId : number;
  @Input() answers : any[];
  barProgress : number = 10;

  waitingForAnswer : boolean = true;

  selectedAnswer : number = -1;

  @ViewChild('actionButton') actionButton : ActionButtonComponent;

  @Output() onQuestionAnswered = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  
  constructor(
    private matchClientService : MatchClientService
  ) { }


  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  public setupQuestion(question : string, answers : string[]) {
    answers = this.shuffleArray(answers);
  }

  onAnswerClick(answerIndex : number) {
    this.selectedAnswer = answerIndex;
  }

  onAnswerResult(correctAnswerId : number) {

    let chosenAnswerId = this.answers[this.selectedAnswer].id;    

    if(chosenAnswerId == correctAnswerId){
      console.log("Correct answer");
    }else {
      console.log("Wrong answer");
    }
    this.waitingForAnswer = false;

    this.barProgress = ((this.questionIndex+1) / this.questionAmount) * 100;
    
  }

  onClickNext(){
    this.onQuestionAnswered.emit();
  }

  onSubmitClick(){
    this.matchClientService.answerQuestion(
      this.gameId,
      this.questionIndex,
      this.answers[this.selectedAnswer].id
    ).subscribe(
      (response : any) => {
        this.onAnswerResult(response.correctAnswerId);
      }, (error : any) => {
        console.log(error);
      });
  }

  onNextQuestionPressed(){
    this.waitingForAnswer = true;
    this.selectedAnswer = -1;
  }

  onCloseClick(){
    this.onClose.emit();
  }
}
