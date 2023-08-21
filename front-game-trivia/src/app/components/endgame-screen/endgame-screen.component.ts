// Angular imports
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Third-party module imports
declare module 'canvas-confetti';
import * as confetti from 'canvas-confetti';

// Service imports
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-endgame-screen',
  templateUrl: './endgame-screen.component.html',
  styleUrls: ['./endgame-screen.component.scss']
})
export class EndgameScreenComponent {

  // Properties for tracking game results
  correctAmount: number = 3;            // Default value, will be updated on component initialization
  totalAmount: number = 5;              // Default value
  percentageCorrect: number = 60;       // Default value

  @Input() gameHistory: any;            // Input property to receive game history from parent component

  // Event emitter to notify the parent component to navigate back
  @Output() onGoBackEvent = new EventEmitter<void>();

  constructor(
    private audioService: AudioService  // Injecting the audio service to play sound effects
  ) { }

  ngOnInit() {
    // Play the end game sound on component initialization
    this.audioService.playEndSound();

    // Calculate the game results from the game history
    this.totalAmount = this.gameHistory.questions.length;
    this.correctAmount = 0;

    for (const question of this.gameHistory.questions) {
      if (question.correctAnswer.id == question.chosenAnswer.id) {
        this.correctAmount++;
      }
    }

    // Calculate the percentage of correct answers
    this.percentageCorrect = Math.round((this.correctAmount / this.totalAmount) * 100);
  }

  ngAfterViewInit() {
    // Launch confetti effects after view initialization
    this.launchConfetti();
  }

  onGoBack() {
    // Emit an event to notify the parent component to navigate back
    this.onGoBackEvent.emit();
  }

  /**
   * Helper method to launch the confetti animation effect.
   */
  launchConfetti() {
    confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
      resize: true,
      useWorker: true,
    })({ particleCount: 100, spread: 160 });
  }
}
