import { Component, OnInit, ViewChild } from '@angular/core';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';
import { DisplayConfigurationService } from '../service/display-configuration.service';
import { SyntheseService } from '../service/synthese.service';

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss']
})
export class SyntheseComponent implements OnInit {

  public data: any;
  public dataGroupByAppartenance: SyntheseDepenseModel[] = [];
  public chartOptions: any;

  public constructor(
      private _syntheseService : SyntheseService,
      private _colorService : DisplayConfigurationService
  ) {

    this.data = {
      datasets: [{
          data: [
              82,
              75,
              60,
              120,
              //25
          ],
          backgroundColor: [
            'rgba(255,0,0,0.2)',
            'rgba(0,255,0,0.2)',
            'rgba(0,0,255,0.2)',
            'rgba(255,199,132,0.2)',
            'rgba(45,99,22,0.2)',            
          ],
          borderColor :[
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)'            
          ],
          label: 'Budget consommé (%)'
      },{
        label: 'Budget prévu (%)',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [100, 100, 100, 100,]
      }],
      labels: [
          "Commun",
          "Nadège",
          "Jean",
          "Thomas",
          //"Divers"
      ]
  };
    
  this.chartOptions =   {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        r: {
            grid: {
                color: '#ebedef'
            }
        }
    }
};
}

 ngOnInit(): void {
    this._syntheseService.getExpenseGroupByAppartenance().subscribe(
        (data: SyntheseDepenseModel) => {
          this.dataGroupByAppartenance = this.createDataForPolarReaGraph(data);
        });
  }
    
  createDataForPolarReaGraph(result: SyntheseDepenseModel): any {
    let retour = null;
    if(result){
        let backgroundColorValue = this._colorService.getBackgroundColor(result.state);
        let borderColorValue = this._colorService.getBorderColor(result.state);
        let polarDataConsommee = [];
        let polarData100Pourcent = [];
        let borderColor = [];
        let backgroundColor = [];
        let polarLabels = [];
        const dataLength = result.data.length;
        for(let i = 0; i< dataLength; i++){
            polarDataConsommee.push(result.data[i].budgetPourcentageDepense);
            polarData100Pourcent.push(100);
            borderColor.push(borderColorValue);
            backgroundColor.push(backgroundColorValue);
            polarLabels.push(result.data[i].appartenanceCaption);
            console.log(result.data[i]);
        }
        retour =
        {
            datasets: [{
                data: polarDataConsommee,
                backgroundColor: backgroundColor,
                borderColor :borderColor,
                label: 'Budget consommé (%)'
            },{
              label: 'Budget prévu (%)',
              backgroundColor: this._colorService.getExpectedColor(),
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: polarData100Pourcent
            }],
            labels: polarLabels
        };
    }
    return retour;
}
}

