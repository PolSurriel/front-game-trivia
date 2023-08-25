import { Injectable } from '@angular/core';
import { IAlertService } from './ialert-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService implements IAlertService {

  constructor() { }
  private alertPoolChanged = new BehaviorSubject<Alert[]>([]);
  alertPool = this.alertPoolChanged.asObservable();

  sendAlert(message: string, durationMilis: number = 3000): void {
    let currentAlerts = this.alertPoolChanged.getValue();
    let alert = new Alert(message, durationMilis);
    
    currentAlerts.push(alert);
    this.alertPoolChanged.next(currentAlerts);

    setTimeout(() => {
      if(alert)
        this.closeAlert(alert);
    }, durationMilis);
  }

  closeAlert(alert: Alert): void {
    let currentAlerts = this.alertPoolChanged.getValue();
    // remove the aler from the pool
    currentAlerts.splice(currentAlerts.indexOf(alert), 1);
    this.alertPoolChanged.next(currentAlerts);
  }
}
