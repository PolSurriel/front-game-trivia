// Angular core imports
import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
// Service imports
import { AudioService } from 'src/app/services/audio.service';
// Component imports
import { ActionButtonComponent } from '../action-button/action-button.component';
import { IGameService, IGameServiceToken } from 'src/app/services/igame.service';
import { IAlertService, IAlertServiceToken } from 'src/app/services/ialert-service.service';


@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {

  // Variables to manage the game logic and UI state
  protected correctAnswerId: number;
  protected barProgress: number = 5;
  protected waitingForAnswer: boolean = true;
  protected selectedAnswer: number = -1;

  // Reference to the child component actionButton
  @ViewChild('actionButton') actionButton: ActionButtonComponent;

  // Event emitters to communicate with parent components
  @Output() onClose = new EventEmitter<void>();
  @Output() onMatchFinished = new EventEmitter<void>();

  // Separate html template from GameService dependency injection
  protected get currentQuestionIndex(): number {
    return this.gameService.currentQuestionIndex;
  }

  protected get currentQuestionText(): string {
    return this.gameService.currentGame.questions[this.currentQuestionIndex].text;
  }
  protected get answers(): any[] {
    return this.gameService.currentGame.questions[this.currentQuestionIndex].answers;
  }

  protected get questionAmount(): number {
    return this.gameService.currentGame.questions.length;
  }


  // Component's constructor with services injection
  constructor(
    private audioService: AudioService,
    @Inject(IGameServiceToken) private gameService: IGameService,
    @Inject(IAlertServiceToken) private alertService: IAlertService
  ) { }

  // Handler for the click event on an answer
  protected onAnswerClick(answerIndex: number) {
    if (!this.waitingForAnswer) return;

    this.selectedAnswer = answerIndex;
  }

  // Handles the logic when an answer's result is received
  private onAnswerResult(correctAnswerId: number) {

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
  protected onClickNext() {
    this.gameService.nextQuestion();
    this.waitingForAnswer = true;
    this.selectedAnswer = -1;

  }

  // Submits the selected answer to the service
  protected onSubmitClick() {
    console.log(this.selectedAnswer);
    this.gameService.answerQuestion(this.answers[this.selectedAnswer].id)
    .then((response: any) => {
      this.onAnswerResult(response.correctAnswerId);

    }).catch((error: any) => {
      console.log('Error sending answer!', error);
      this.alertService.sendAlert('Oops! There was a network error! Please try again.');
    });

  }

  protected onClickGoToResume(){
    this.gameService.finishGame().then(() => {
      this.onMatchFinished.emit();

    }).catch((error: any) => {
      console.log('Error finishing game!', error);
      this.alertService.sendAlert('Oops! There was a network error! Please try again.');
    });
  }

  // Handles the click event on the close button
  protected onCloseClick() {
    this.onClose.emit();
  }
}
