import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { never, Observable } from 'rxjs';
import { CompteService } from 'src/app/core/service/compte.service';
import { DisplayIconService, } from 'src/app/core/service/display-icon-service.service';
import { Appartenance, AppartenanceUI } from '../../../core/model/appartenance';
import { Group, GroupUI } from '../../../core/model/group';
import { AppartenanceService } from '../../../core/service/appartenance.service';
import { GroupService } from '../../../core/service/group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})


export class MainComponent implements OnInit {

  public groups: GroupUI[] = [];
  public appartenances: AppartenanceUI[] = [];
  public depenseForm = new FormControl(null);

  public isLinear = false;
  public isLoading = true;

  constructor(
    private _appartenanceService: AppartenanceService,
    private _groupService: GroupService,
    private _displayService: DisplayIconService,
    private _temp: CompteService) {
  }

  ngOnInit(): void {
    console.log("Init de Main Component");
    this.isLoading = true;
    this._appartenanceService.getAppartenances().subscribe
      (
        {
          next: (data: Appartenance[]) => {
            this.appartenances = [];
            data.forEach(element => {
              this.appartenances.push({ appartenance: element, urlDisplay: this._displayService.getURL(element.caption) });
            });
            this.isLoading = false;

          },
          error: (data : any) => {
            this.isLoading = false;
          },
          complete: () => {
            //Dummy in this version.
          }
        });
  }

  onClickQui(input: any | null): void {
    this.isLoading = true;
    this.groups = [];    
    this._groupService.getGroups(input).subscribe(
      (data: Group[]) => {
        this.isLoading = false;        
        this.groups = [];
        data.forEach(element => {
          this.groups.push({
            group: element, urlDisplay: this._displayService.getURL(element.caption)
          });
        });
      });
  }

  onClickQuoi(input: any | null): void {
    this.depenseForm.setValue(input?.group?.id);
    this.groups = [];    
  }
}
