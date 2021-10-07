import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public toggleControl: FormControl;
  public imageDepense = "./assets/icons/expenses.svg";
  public imageSynthese = "./assets/icons/statistics.svg";
  @HostBinding('class') className = '';
  constructor() {
    this.toggleControl = new FormControl(true);
  }

  ngOnInit(): void {
    // const darkClassName = 'darkMode';
    // this.className = darkClassName;
  }

}
