import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { never, Observable } from 'rxjs';
import { CompteModel } from 'src/app/model/compte-model';
import { CompteOperationModel } from 'src/app/model/compte-operation-model';
import { CompteService } from 'src/app/service/compte.service';
import { DisplayIconService, } from 'src/app/service/display-icon-service.service';
import { Appartenance, AppartenanceUI } from '../../model/appartenance';
import { Group, GroupUI } from '../../model/group';
import { AppartenanceService } from '../../service/appartenance.service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
    this.isLoading = true;
    this._appartenanceService.getAppartenances().subscribe
      (
        {
          next: (data: Appartenance[]) => {
            console.log("get Appartenance Next");
            console.log(data);
            this.appartenances = [];
            data.forEach(element => {
              this.appartenances.push({ appartenance: element, urlDisplay: this._displayService.getURL(element.caption) });
            });
            this.isLoading = false;

          },
          error: (data : any) => {
            this.isLoading = false;
            console.log("Erreur dans le get Appartenance");
            console.log('Erreur stringifiee-> ' + JSON.stringify(data));
            console.log(data);
          },
          complete: () => {
            console.log("get Appartenance Completed");
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
