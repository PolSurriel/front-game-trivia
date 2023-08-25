import { Component, Inject } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { IAlertService, IAlertServiceToken } from 'src/app/services/ialert-service.service';

@Component({
  selector: 'app-custom-alerts',
  templateUrl: './custom-alerts.component.html',
  styleUrls: ['./custom-alerts.component.scss']
})
export class CustomAlertsComponent {

  protected alertPool: Alert[] = [];

  constructor(
    @Inject(IAlertServiceToken) private alertService: IAlertService
  ) { }

  ngOnInit(): void {
    this.alertService.alertPool.subscribe((pool) => {
      this.alertPool = pool;
    });
  }

  protected closeAlert(alert: Alert) {
    this.alertService.closeAlert(alert);
  }
}
