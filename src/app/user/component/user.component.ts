import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InitialisationService } from '../../core/service/initialisation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name = new FormControl('');
  constructor(private userService: InitialisationService) { }

  ngOnInit(): void {
    this.name.setValue(this.userService.getUserName());
  }

  onSubmit() {
    console.log(this.name);
    this.userService.setUserName(this.name.value);
  }
  onCancel() {
    this.name.setValue(this.userService.getUserName());
    console.log(this.name.value);
  }
}
