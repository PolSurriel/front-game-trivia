import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import { AlertService } from "./alert.service";
import { Alert } from "../models/Alert";

export const IAlertServiceToken = new InjectionToken<IAlertService>('IAlertServiceToken');
export const IAlertServiceTokenProvider = { provide: IAlertServiceToken, useClass: AlertService };

export interface IAlertService {
    alertPool : Observable<Alert[]>;
    sendAlert(message: string, durationMilis? : number): void;
    closeAlert(alert: Alert): void;
}