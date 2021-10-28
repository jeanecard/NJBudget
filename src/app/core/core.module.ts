import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyntheseService } from './service/synthese.service';
import { NotificationService } from './service/notification.service';
import { InitialisationService } from './service/initialisation.service';
import { GroupService } from './service/group.service';
import { DisplayIconService } from './service/display-icon-service.service';
import { DisplayConfigurationService } from './service/display-configuration.service';
import { AppartenanceService } from './service/appartenance.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ],
  providers: [
    SyntheseService,
    NotificationService,
    InitialisationService,
    GroupService,
    DisplayIconService,
    DisplayConfigurationService,
    AppartenanceService],
  exports: [
    CommonModule
  ]
})
export class CoreModule { }
