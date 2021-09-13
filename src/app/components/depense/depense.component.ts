import { Component, OnInit } from '@angular/core';
import { CompteModel } from 'src/app/model/compte-model';
import { CompteOperationModel } from 'src/app/model/compte-operation-model';
import { StateCompte } from 'src/app/model/state-compte';
import { CompteService } from 'src/app/service/compte.service';
import { DisplayConfigurationService } from 'src/app/service/display-configuration.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {

  public displayedColumns: string[] = ['dateOperation', 'caption', 'value', 'action'];
  public dataSource : CompteOperationModel[]= [];
  public graphData: any;
  public compteModel : CompteModel | null = null;
  public horizontalOptions: any;



  constructor(    
    private compteService : CompteService, 
    private notifyService : NotificationService,
    private _displayConfService : DisplayConfigurationService) { }

  ngOnInit(): void {
    this.compteService.getCompte("1").subscribe(
      (data: CompteModel) => {
          this.compteModel = data;
          this.dataSource = data.operations;
          this.updateGraph();
      });

     

    this.horizontalOptions = {
      indexAxis: 'y',
      
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
    };
    
  }

  onDeleteRow(input : any) : void{
    console.log(input);
  }

  public addOperation() : void{
    if(!this.compteModel)
    {
        return;
    }
  let operation : CompteOperationModel = {
      caption : "TEST Caption",
      compteId: this.compteModel.id,
      dateOperation: new Date(),
      id:"TEST ID",
      value:10
  };
  
  this.compteService.addOperation(operation, this.compteModel).subscribe(
      (data: CompteModel) => {
          this.notifyService.showSuccess("Opération gain prise en compte", "NJ app");
          this.compteModel = data;
          this.dataSource = [];

          data.operations.forEach(e => {
              this.dataSource.push(e);
          });

          this.updateGraph();
          
});
  
  }

  private updateGraph() : void {
    if(!this.compteModel){
      this.graphData = [];
    }else{
      let compteReelColor = this._displayConfService.getBackgroundColor(this.compteModel.state);
      let compteExpectedColor = this._displayConfService.getExpectedColor();

      this.graphData = {
          labels: ['Septembre'],
          datasets: [
              {
                  label: 'Prévu',
                  backgroundColor: [
                    compteExpectedColor,
                ],
                  data: [this.compteModel.budgetExpected]
              },
              {
                  label: 'Réel',
                  backgroundColor: compteReelColor,
    
                  data: [this.compteModel.budgetSpent]
              }
          ]
      };
    }
  
  }
  
  
  public removeOperation() : void{
      //this.notifyService.showSuccess("Data shown successfully !!", "tutsmake.com")
      if(!this.compteModel)
      {
          return;
      }
    let operation : CompteOperationModel = {
        caption : "TEST Caption",
        compteId: this.compteModel.id,
        dateOperation: new Date(),
        id:"TEST ID",
        value:10
    };
    
    this.compteService.removeOperation(operation, this.compteModel).subscribe(
        (data: CompteModel) => {
          this.notifyService.showSuccess("Opération retrait prise en compte", "NJ app");              
            this.compteModel = data;
            this.dataSource = data.operations;  
            this.updateGraph(); 
        });                   
  }


  getMonthLocal(
    inputMonthIndex : number,
    locale?: string ): string {
    const year = new Date().getFullYear(); // 2020
    const monthList = [...Array(12).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "short"
    });
  
    const getMonthName = formatter.format(new Date(2000, inputMonthIndex));
  
    return getMonthName;
  }
}
