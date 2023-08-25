export class Alert{
    message : string;
    durationMilis : number;
    id : number;
    private static idCounter : number = 0;

    constructor(message : string, durationMilis : number = 3000){
        this.message = message;
        this.durationMilis = durationMilis;
        this.id = Alert.idCounter++;
    }
}