import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../model/group';


const STUB_DATA: Group[] = [
  {id:'1', appartenanceId:'1', caption:'Electrécité', },
  {id:'2', appartenanceId:'1', caption:'Eau', },
  {id:'3', appartenanceId:'1', caption:'Nourriture/Courses', },
  {id:'4', appartenanceId:'1', caption:'Assurance', },
  {id:'5', appartenanceId:'1', caption:'Vêtements', },
];



@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  public getGroups(idAppartenance : number) : Observable<Group[]>{
    return of(STUB_DATA);
  }
}
