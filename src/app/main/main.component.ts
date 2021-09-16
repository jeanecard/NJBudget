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

  public appartenanceOptions: Appartenance[] = [];
  public groupOptions: Group[] = [];

  public categoriesCommun = [
    {urlDisplay:"./assets/icons/commission.png"},
    {urlDisplay:"./assets/icons/impot.png"},
    {urlDisplay:"./assets/icons/telephone.png"},
    {urlDisplay:"./assets/icons/internet.png"},
    {urlDisplay:"./assets/icons/eau.png"},
    {urlDisplay:"./assets/icons/electrecite.png"},
    {urlDisplay:"./assets/icons/essence.png"},    
    {urlDisplay:"./assets/icons/bank.png"},    
    {urlDisplay:"./assets/icons/animaux.png"},        
    {urlDisplay:"./assets/icons/bois.png"},        
    {urlDisplay:"./assets/icons/entretien.png"},        
    {urlDisplay:"./assets/icons/loisir.png"},        
    {urlDisplay:"./assets/icons/epargne.png"},        
    {urlDisplay:"./assets/icons/assurance.png"},        
  ];

  public categoriesNadege = [
    {urlDisplay:"./assets/icons/vetement.png"},        
    {urlDisplay:"./assets/icons/loisir.png"},        
    {urlDisplay:"./assets/icons/coiffeur.png"},        
  ];

  public categoriesThomas = [
    {urlDisplay:"./assets/icons/cantine.png"},    
    {urlDisplay:"./assets/icons/transport.png"},        
    {urlDisplay:"./assets/icons/vetement.png"},        
    {urlDisplay:"./assets/icons/loisir.png"},        
 
  ];

  public categoriesJean = [
    {urlDisplay:"./assets/icons/transport.png"},        
    {urlDisplay:"./assets/icons/vetement.png"},        
    {urlDisplay:"./assets/icons/loisir.png"},        
  ];


  public jean: string;
  public commun: string;
  public nadege: string;
  public thomas: string;
  public categories : any;

  public isLinear = false;
  public appartenanceFormGroup: FormGroup;
  public categorieFormGroup: FormGroup;
  public appartenanceForm: FormControl;
  public categorieForm: FormControl;

  constructor(
    private _appartenanceService: AppartenanceService,
    private _groupService: GroupService,
    private _formBuilder: FormBuilder) {

    this.appartenanceForm = new FormControl('', Validators.required);
    this.categorieForm = new FormControl('', Validators.required);

    this.appartenanceFormGroup = this._formBuilder.group({
      appartenanceForm: this.appartenanceForm,
    });

    this.categorieFormGroup = this._formBuilder.group({
      categorieForm: this.categorieForm
    });

    this.jean = "./assets/icons/jean.png";
    this.commun = "./assets/icons/house.png"; 
    this.nadege = "./assets/icons/nad.png";
    this.thomas = "./assets/icons/boy.png";
  }

  ngOnInit(): void {

    this._appartenanceService.getAppartenances().subscribe(
      (data: Appartenance[]) => {
        this.appartenanceOptions = data;
      });

    //this._groupService.getGroups()
  }

  onClick(input: any |null): void {
    console.log(input);
    if(input === "1"){
      this.categories = this.categoriesCommun;
    } else if(input === "2"){
      this.categories = this.categoriesJean;
    } else if(input === "3"){
      this.categories = this.categoriesNadege;
    } else{
      this.categories = this.categoriesThomas;
    }
  }; 
}
