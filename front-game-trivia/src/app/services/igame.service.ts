import { GameInfo } from "../models/GameInfo";

export interface IGameService {
    startNewGame(amount: number, difficulty: string, categories: string[]): Promise<GameInfo>;
    allQuestionsAnswered(): boolean;
    answerQuestion(answerId: number): Promise<any>;
    nextQuestion(): void;
    finishGame(): Promise<any>;
    getGameHistory(): Promise<GameInfo>;
  }