import { Injectable } from '@angular/core';
import { MatchClientService } from './match-client.service';
import { GameInfo } from '../models/GameInfo';
import { ArrayUtilitiesService } from './array-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentGame: GameInfo;
  currentQuestionIndex: number = 0;

  constructor(
    private matchClientService: MatchClientService,
    private arrayUtilitiesService: ArrayUtilitiesService
  ) {}

  startNewGame(amount: number, difficulty: string, categories: string[]): Promise<GameInfo> {
    return new Promise((resolve, reject) => {
      this.matchClientService.createNewGame(amount, difficulty, categories)
        .subscribe((data: GameInfo) => {
          this.currentGame = data;
          for (let i = 0; i < this.currentGame.questions.length; i++) {
            this.currentGame.questions[i].answers = this.arrayUtilitiesService.shuffleArray(this.currentGame.questions[i].answers);
          }
          this.currentQuestionIndex = 0;
          resolve(this.currentGame);
        }, reject);
    });
  }

  answerQuestion(answerId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.currentGame || this.currentQuestionIndex >= this.currentGame.questions.length) {
        reject('No active game or invalid question index.');
        return;
      }
      const gameId = this.currentGame.id;
      const questionId = this.currentGame.questions[this.currentQuestionIndex].id;
      this.matchClientService.answerQuestion(gameId, questionId, answerId)
        .subscribe(resolve, reject);
    });
  }

  nextQuestion(): void {
    if (this.currentGame) {
      this.currentQuestionIndex++;
    }
  }

  finishGame(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.currentGame) {
        reject('No active game.');
        return;
      }
      this.matchClientService.finishGame(this.currentGame.id)
        .subscribe(resolve, reject);
    });
  }

  getGameHistory(): Promise<GameInfo> {
    return new Promise((resolve, reject) => {
      if (!this.currentGame) {
        reject('No active game.');
        return;
      }
      this.matchClientService.getGameById(this.currentGame.id)
        .subscribe((data: GameInfo) => {
          resolve(data);
        }, reject);
    });
  }
}