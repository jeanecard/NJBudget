import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { never, Observable } from 'rxjs';
import { DisplayIconService,  } from 'src/app/service/display-icon-service.service';
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
  public appartenances: AppartenanceUI[]  = [];
  public depenseForm = new FormControl(null);

  public isLinear = false;

  constructor(
    private _appartenanceService: AppartenanceService,
    private _groupService: GroupService,
    private _displayService: DisplayIconService) {
  }

  ngOnInit(): void {

    this._appartenanceService.getAppartenances().subscribe(
      (data : Appartenance[]) =>{
        this.appartenances = [];
        data.forEach(element => {
          this.appartenances.push({appartenance: element, urlDisplay: this._displayService.getURL(element.caption)});
        });
    } );
  }

  onClickQui(input: any | null): void {
    console.log('clickQui');
    console.log(input);
    this._groupService.getGroups(input).subscribe(
      (data : Group[]) =>{
        this.groups = [];
        data.forEach(element => {
          this.groups.push({
            group : element, urlDisplay : this._displayService.getURL(element.caption) });
        });
    } );
  }

  onClickQuoi(input: any | null): void {
    console.log('clickQuoi');
    console.log(input?.group?.id);
    this.depenseForm.setValue(input?.group?.id);
  }
}
