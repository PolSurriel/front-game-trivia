// Angular core imports
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// Service imports
import { MatchClientService } from 'src/app/services/match-client.service';
import { AudioService } from 'src/app/services/audio.service';
// Component imports
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {

  // Input properties to accept data from parent components
  @Input() questionAmount: number;
  @Input() question: string;
  @Input() questionIndex: number;
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
  @Output() onQuestionAnswered = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  // Component's constructor with services injection
  constructor(
    private matchClientService: MatchClientService,
    private audioService: AudioService
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
    this.barProgress = ((this.questionIndex + 1) / this.questionAmount) * 100;

  }

  // Handles the click event on the next button
  onClickNext() {
    this.onQuestionAnswered.emit();
  }

  // Submits the selected answer to the service
  onSubmitClick() {
    this.matchClientService.answerQuestion(
      this.gameId,
      this.questionIndex,
      this.answers[this.selectedAnswer].id
    ).subscribe(
      (response: any) => {
        this.onAnswerResult(response.correctAnswerId);
      }, (error: any) => {
        console.log(error);
        alert('Error sending answer!');
        
      });
  }

  // Resets certain properties to their initial state for the next question
  onNextQuestionPressed() {
    this.waitingForAnswer = true;
    this.selectedAnswer = -1;
  }

  // Handles the click event on the close button
  onCloseClick() {
    this.onClose.emit();
  }
}
