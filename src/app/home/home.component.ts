import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public imageDepense = "./assets/icons/expenses.svg";
 public imageSynthese = "./assets/icons/statistics.svg";
  constructor() { }

  ngOnInit(): void {
  }

}
