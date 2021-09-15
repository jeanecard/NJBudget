import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appartenance } from '../model/appartenance';
import { Group } from '../model/group';
import { AppartenanceService } from '../service/appartenance.service';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  public appartenanceOptions : Appartenance[] = [];
  public groupOptions : Group[]= [];


  public isLinear = true;
  public appartenanceEtCategorieFormGroup: FormGroup;
  // public depenseFormGroup: FormGroup;
  public appartenanceForm: FormControl;
  public categorieForm : FormControl;

  constructor(
    private _appartenanceService : AppartenanceService,
    private _groupService : GroupService,
    private _formBuilder: FormBuilder) { 

      this.appartenanceForm = new FormControl('', Validators.required);
      
      this.categorieForm = new FormControl('', Validators.required);
      this.appartenanceEtCategorieFormGroup = this._formBuilder.group({
        appartenanceForm: this.appartenanceForm, 
        categorieForm: this.categorieForm
      });
  }

  ngOnInit(): void {

      this._appartenanceService.getAppartenances().subscribe(
        (data: Appartenance[]) => {
          this.appartenanceOptions = data;
        });

    //this._groupService.getGroups()
  }
}
