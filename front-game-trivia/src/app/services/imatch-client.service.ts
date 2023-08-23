import { Observable } from "rxjs";
import { GameInfo } from "../models/GameInfo";

export interface IMatchClientService {
  createNewGame(amount: number, difficulty: string, categories: string[]): Observable<GameInfo>;
  answerQuestion(gameId: number, questionIndex: number, answerId: number): Observable<any>;
  finishGame(gameId: number): Observable<any>;
  getGameById(gameId: number): Observable<GameInfo>;
}