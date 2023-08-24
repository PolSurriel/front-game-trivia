import { GameInfo } from "../models/GameInfo";
import { InjectionToken } from '@angular/core';
import { GameService } from "./game.service";

export const IGameServiceToken = new InjectionToken<IGameService>('IGameServiceToken');
export const IGameServiceTokenProvider = { provide: IGameServiceToken, useClass: GameService };

export interface IGameService {
  get currentGame(): GameInfo;
  get currentQuestionIndex(): number;
  startNewGame(amount: number, difficulty: string, categories: string[]): Promise<GameInfo>;
  allQuestionsAnswered(): boolean;
  answerQuestion(answerId: number): Promise<any>;
  nextQuestion(): void;
  finishGame(): Promise<any>;
  getGameHistory(): Promise<GameInfo>;
}