import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InitialisationService } from 'src/app/core/service/initialisation.service';

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
    this.userService.setUserName(this.name.value);
  }
  onCancel() {
    this.name.setValue(this.userService.getUserName());
  }
}
