import { Inject, Injectable } from '@angular/core';
import { GameInfo } from '../models/GameInfo';
import { IGameService } from './igame.service';
import { IMatchClientService, IMatchClientServiceToken } from './imatch-client.service';
import { IArrayUtilitiesService, IArrayUtilitiesServiceToken } from './iarray-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService {
  currentGame: GameInfo;
  currentQuestionIndex: number = 0;

  constructor(
    @Inject(IMatchClientServiceToken) private matchClientService: IMatchClientService,
    @Inject(IArrayUtilitiesServiceToken) private arrayUtilitiesService: IArrayUtilitiesService
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

  allQuestionsAnswered(): boolean {
    return this.currentQuestionIndex >= this.currentGame.questions.length;
  }


  answerQuestion(answerId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.currentGame || this.currentQuestionIndex >= this.currentGame.questions.length) {
        reject('No active game or invalid question index.');
        return;
      }
      const gameId = this.currentGame.id;
      const questionIndex = this.currentQuestionIndex;
      this.matchClientService.answerQuestion(gameId, questionIndex, answerId)
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
        .subscribe((data: any) => {
          this.currentGame = data as GameInfo;
          resolve(data);
        }, reject);
    });
  }
}
