import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { CategorySelectorInputComponent } from '../category-selector-input/category-selector-input.component';
import { GameInfo } from 'src/app/models/GameInfo';
import { Difficulty } from 'src/app/enums/difficulty.enum';
import { IGameServiceToken, IGameService } from 'src/app/services/igame.service';
import { IAlertService, IAlertServiceToken } from 'src/app/services/ialert-service.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent {

  // Configuration object for game setup
  private config: any = {
    amount: 5,
    category: [],
    difficulty: Difficulty.EASY
  };

  // Duration for closing screen animation
  private animationCloseScreenDuration: number = 500;

  protected loading: boolean = false;

  // Event to be emitted when starting the game
  @Output() onStartGameEvent = new EventEmitter<GameInfo>();
  
  // References to child components and elements
  @ViewChild(CategorySelectorInputComponent) categorySelector: CategorySelectorInputComponent;
  @ViewChild('container') container: ElementRef;

  // State to check if the screen is ready to close
  private readyToClose: boolean = false;

  constructor(
    @Inject(IGameServiceToken) private gameService: IGameService,
    @Inject(IAlertServiceToken) private alertService: IAlertService
  ) { }

  // After component's view is initialized, the game's category is set
  ngAfterViewInit(): void {
    this.config.category = this.categorySelector.customSelection;
  }

  // Update the game's question amount
  protected onQuestionAmountChange(amount: number) {
    this.config.amount = amount;
  }

  // Update the game's difficulty
  protected onSelectedDifficultyChange(difficulty: string) {
    this.config.difficulty = difficulty;
  }

  // Update the game's category
  protected onQuestionCategoryChange(category: string[]) {
    this.config.category = category;
  }

  // Emit the game start event (recursive if not ready)
  private onStartGame(game: GameInfo) {
    if (this.readyToClose) {
      this.onStartGameEvent.emit(game);
    } else {
      setTimeout(() => {
        this.onStartGame(game);
      }, this.animationCloseScreenDuration);
    }
  }

  // Handle play button click. Triggers screen hide animation and creates a new game
  protected onPlayClick() {
    
    this.gameService.startNewGame(
      this.config.amount,
      this.config.difficulty,
      this.config.category
    ).then((gameInfo : GameInfo) => {
      this.loading = false;
      this.onStartGame(gameInfo);
    }).catch(error => {
      this.loading = false;
      console.log("Error creating new game: ", error);
      this.alertService.sendAlert('Error creating game! Please keep trying.');
      this.container.nativeElement.classList.remove('hide');
    });
    // Add the 'hide' class for the animation
    this.container.nativeElement.classList.add('hide');
    this.loading = true;
    this.readyToClose = false;
    setTimeout(() => {
      this.readyToClose = true;
    }, this.animationCloseScreenDuration);
   
  }

}
