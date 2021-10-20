import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public toggleControl: FormControl;
  public imageDepense = "./assets/icons/expenses.svg";
  public imageSynthese = "./assets/icons/statistics.svg";
  public imageUser = "./assets/icons/who.png";
  constructor(private router: Router) {
    this.toggleControl = new FormControl(true);
  }

  ngOnInit(): void {
  }
  public goToSaisie(): void {
    this.router.navigate(['depense']);
  }

  public goToSynthese(): void {
    this.router.navigate(['synthese']);
  }

  public goToUser(): void {
    this.router.navigate(['user']);
  }

}
