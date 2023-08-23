import { Answer } from "./Answer";

export class Question {
    id: number;
    category: string;
    text: string;
    answers: Answer[];
    chosenAnswer: Answer | null;
    correctAnswer: Answer | null;
}