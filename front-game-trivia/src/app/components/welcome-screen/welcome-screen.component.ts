import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategorySelectorInputComponent } from '../category-selector-input/category-selector-input.component';
import { GameInfo } from 'src/app/models/GameInfo';
import { Difficulty } from 'src/app/enums/difficulty.enum';
import { GameService } from 'src/app/services/game.service';


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
    difficulty: Difficulty.EASY
  };

  // Duration for closing screen animation
  animationCloseScreenDuration: number = 500;

  // Event to be emitted when starting the game
  @Output() onStartGameEvent = new EventEmitter<GameInfo>();
  
  // References to child components and elements
  @ViewChild(CategorySelectorInputComponent) categorySelector: CategorySelectorInputComponent;
  @ViewChild('container') container: ElementRef;

  // State to check if the screen is ready to close
  readyToClose: boolean = false;

  constructor(
    private gameService: GameService
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
  onStartGame(game: GameInfo) {
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
    
    this.gameService.startNewGame(
      this.config.amount,
      this.config.difficulty,
      this.config.category
    ).then((gameInfo : GameInfo) => {
      this.onStartGame(gameInfo);
    }).catch(error => {
        console.log("Error creating new game: ", error);
        alert('Error creating game!');
        location.reload();
    });
    // Add the 'hide' class for the animation
    this.container.nativeElement.classList.add('hide');
    this.readyToClose = false;
    setTimeout(() => {
      this.readyToClose = true;
    }, this.animationCloseScreenDuration);
   
  }

}
