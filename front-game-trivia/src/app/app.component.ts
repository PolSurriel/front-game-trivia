// Angular core imports
import { Component, ViewChild  } from '@angular/core';
import { QuestionScreenComponent } from './components/question-screen/question-screen.component';
import { MatchClientService } from './services/match-client.service';
import { GameInfo } from './models/GameInfo';
import { GameService } from './services/game.service';

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
  
  // References to child components
  @ViewChild(QuestionScreenComponent) questionScreen: QuestionScreenComponent;

  constructor(
    private matchClientService: MatchClientService,
    protected gameService: GameService
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
    this.matchClientService.finishGame(this.gameService.currentGame.id);
  }
}
