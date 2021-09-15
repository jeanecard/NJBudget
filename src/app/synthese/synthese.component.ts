import { Component, OnInit, ViewChild } from '@angular/core';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';
import { DisplayConfigurationService } from '../service/display-configuration.service';
import { SyntheseService } from '../service/synthese.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss']
})
export class SyntheseComponent implements OnInit {
  @ViewChild("quiChart")
  chart: ChartComponent = new ChartComponent;
  
  public quiChartOptions: ChartOptions;
  public communChartOptions: any;
  public jeanChartOptions: any;
  public nadegeChartOptions: any;


  public constructor(
      private _syntheseService : SyntheseService,
      private _colorService : DisplayConfigurationService
  ) {
    this.quiChartOptions = this.createDataForPolarReaGraph(null);
}

 ngOnInit(): void {
    this._syntheseService.getExpenseGroupByAppartenance().subscribe(
        (data: SyntheseDepenseModel) => {
          this.quiChartOptions = this.createDataForPolarReaGraph(data);
          this.jeanChartOptions = this.quiChartOptions;
          this.nadegeChartOptions = this.quiChartOptions;
          this.communChartOptions = this.quiChartOptions;
        });
  }
    
  createDataForPolarReaGraph(input: SyntheseDepenseModel |null): any {
    let retour = null;
    if(input){
        let backgroundColorValue = this._colorService.getBackgroundColor(input.state);
        let borderColorValue = this._colorService.getBorderColor(input.state);
        let polarDataConsommee = [];
        let polarData100Pourcent = [];
        let borderColor = [];
        let backgroundColor = [];
        let polarLabels = [];
        const dataLength = input.data.length;
        for(let i = 0; i< dataLength; i++){
            polarDataConsommee.push(input.data[i].budgetPourcentageDepense);
            polarData100Pourcent.push(100);
            borderColor.push(borderColorValue);
            backgroundColor.push(backgroundColorValue);
            polarLabels.push(input.data[i].appartenanceCaption);
        }
        retour =
        {
          series: [
            {
              name: "Budget prévu (%)",
              data: polarData100Pourcent,
              color: "#D3D3D3",
            },
            {
              name: "Budget réel (%)",
              data: polarDataConsommee,
              color:backgroundColorValue,
            }
          ],
          chart: {
            height: 350,
            type: "radar",
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
          },
          stroke: {
            width: 1
          },
          markers: {
            size: 1,
            
          },
          xaxis: {
            categories: polarLabels
          },
          yaxis: {
          },
          dataLabels: {
            enabled: false,
          },          
        };
    }
    return retour;
}
}

