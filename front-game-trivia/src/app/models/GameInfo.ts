import { Question } from "./Question";

export class GameInfo {
    id: number;
    difficulty: string;
    questions: Question[];
    categories: string[];
    
}