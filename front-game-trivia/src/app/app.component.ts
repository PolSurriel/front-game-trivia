// Angular core imports
import { Component, Inject  } from '@angular/core';
import { GameInfo } from './models/GameInfo';
import { IGameService } from './services/igame.service';
import { IGameServiceToken } from './services/igame.service';

enum Screen{
  Welcome = 'welcome',
  Question = 'question',
  Endgame = 'endgame'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Current screen in the game (e.g., welcome, question, endgame)
  protected currentScreen: Screen = Screen.Welcome;

  constructor(
    @Inject(IGameServiceToken) protected gameService: IGameService
  ) {}

  // Handler for starting the game
  protected onStartGame(gameSettings: GameInfo) {
    this.currentScreen = Screen.Question;
  }

  // Handler for when the "go back" button is pressed on the game resume screen
  protected onGameResumeGoBackClicked() {
    this.currentScreen = Screen.Welcome;
  }

  protected onGameMatchFinished() {
    this.gameService.getGameHistory().then(() => {
      this.currentScreen = Screen.Endgame;

    });
  }

  // Handler for when the game is closed
  protected onGameClose() {
    this.currentScreen = Screen.Welcome;
    this.gameService.finishGame();
  }
}
