// Angular core imports
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// Service imports
import { AudioService } from 'src/app/services/audio.service';
// Component imports
import { ActionButtonComponent } from '../action-button/action-button.component';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {

  // Input properties to accept data from parent components
  @Input() questionAmount: number;
  @Input() question: string;
  // @Input() questionIndex: number;
  @Input() gameId: number;
  @Input() answers: any[];

  // Variables to manage the game logic and UI state
  correctAnswerId: number;
  barProgress: number = 10;
  waitingForAnswer: boolean = true;
  selectedAnswer: number = -1;

  // Reference to the child component actionButton
  @ViewChild('actionButton') actionButton: ActionButtonComponent;

  // Event emitters to communicate with parent components
  @Output() onClose = new EventEmitter<void>();
  @Output() onMatchFinished = new EventEmitter<void>();

  // Component's constructor with services injection
  constructor(
    private audioService: AudioService,
    public gameService: GameService
  ) { }

  // Handler for the click event on an answer
  onAnswerClick(answerIndex: number) {
    if (!this.waitingForAnswer) return;

    this.selectedAnswer = answerIndex;
  }

  // Handles the logic when an answer's result is received
  onAnswerResult(correctAnswerId: number) {

    let chosenAnswerId = this.answers[this.selectedAnswer].id;
    this.correctAnswerId = correctAnswerId;
    this.waitingForAnswer = false;

    // Play sound based on answer correctness
    if (chosenAnswerId == correctAnswerId) {
      this.audioService.playSuccessSound();
    } else {
      this.audioService.playFailSound();
    }

    // Update the progress bar
    this.barProgress = ((this.gameService.currentQuestionIndex + 1) / this.questionAmount) * 100;

  }

  // Handles the click event on the next button
  onClickNext() {
    this.gameService.nextQuestion();
    this.waitingForAnswer = true;
    this.selectedAnswer = -1;

  }

  // Submits the selected answer to the service
  onSubmitClick() {
    this.gameService.answerQuestion(this.answers[this.selectedAnswer].id)
    .then((response: any) => {
      this.onAnswerResult(response.correctAnswerId);

    }).catch((error: any) => {
      console.log('Error sending answer!', error);
      alert('Error sending answer!');
    });

  }

  onClickGoToResume(){
    this.gameService.finishGame().then(() => {
      this.onMatchFinished.emit();

    }).catch((error: any) => {
      console.log('Error finishing game!', error);
      alert('Error finishing game!');
    });
  }

  // Handles the click event on the close button
  onCloseClick() {
    this.onClose.emit();
  }
}
