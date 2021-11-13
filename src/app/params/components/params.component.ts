import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {

  public valeurForm = new FormControl();
  public isLoading = false;
  constructor() { }

  ngOnInit(): void {
    console.log('Parammmmmmmmmmmmmmmmmmmm');
  }
  public save(){

  }
}
