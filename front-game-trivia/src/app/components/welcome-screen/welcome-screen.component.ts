import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatchClientService } from 'src/app/services/match-client.service';
import { CategorySelectorInputComponent } from '../category-selector-input/category-selector-input.component';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent {

  // Configuration object for game setup
  config: any = {
    amount: 5,
    category: [],
    difficulty: 'easy'
  };

  // Duration for closing screen animation
  animationCloseScreenDuration: number = 500;

  // Event to be emitted when starting the game
  @Output() onStartGameEvent = new EventEmitter<any>();
  
  // References to child components and elements
  @ViewChild(CategorySelectorInputComponent) categorySelector: CategorySelectorInputComponent;
  @ViewChild('container') container: ElementRef;

  // State to check if the screen is ready to close
  readyToClose: boolean = false;

  constructor(
    private matchClientService: MatchClientService
  ) { }

  // After component's view is initialized, the game's category is set
  ngAfterViewInit(): void {
    this.config.category = this.categorySelector.customSelection;
  }

  // Update the game's question amount
  onQuestionAmountChange(amount: number) {
    this.config.amount = amount;
  }

  // Update the game's difficulty
  onSelectedDifficultyChange(difficulty: string) {
    this.config.difficulty = difficulty;
  }

  // Update the game's category
  onQuestionCategoryChange(category: string[]) {
    this.config.category = category;
  }

  // Emit the game start event (recursive if not ready)
  onStartGame(game: any) {
    if (this.readyToClose) {
      this.onStartGameEvent.emit(game);
    } else {
      setTimeout(() => {
        this.onStartGame(game);
      }, this.animationCloseScreenDuration);
    }
  }

  // Handle play button click. Triggers screen hide animation and creates a new game
  onPlayClick() {
    // Add the 'hide' class for the animation
    this.container.nativeElement.classList.add('hide');
    this.readyToClose = false;
    setTimeout(() => {
      this.readyToClose = true;
    }, this.animationCloseScreenDuration);

    // Use the service to create a new game with the selected configuration
    this.matchClientService
      .createNewGame(
        this.config.amount,
        this.config.difficulty,
        this.config.category
      ).subscribe(
        (data) => {
          this.onStartGame(data);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

}
