import { Component, OnInit, ViewChild } from '@angular/core';
import { SyntheseDepenseModel } from '../../../core/model/synthese-depense-model';
import { DisplayConfigurationService } from '../../../core/service/display-configuration.service';
import { SyntheseService } from '../../../core/service/synthese.service';

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
import { SyntheseDepenseByAppartenanceModel } from 'src/app/core/model/synthese-depense-by-appartenance-model';
import { StateCompte } from 'src/app/core/model/state-compte';
import { SyntheseDepenseGlobal } from 'src/app/core/model/synthese-depense-global';

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
  public thomasChartOptions: any;
  public globalChartOptions: any;


  public isLoadingQui = true;
  public isLoadingCommun = true;
  public isLoadingJean = true;
  public isLoadingThomas = true;
  public isLoadingNadege = true;
  public isLoadingGlobal = true;

  public month = "";


  private _APPARTENANCE_COMMUN_GUID = "3841747d-8e40-4de8-acd4-4d2b49475cc6";
  private _APPARTENANCE_JEAN_GUID = "3841747d-8e40-4de8-acd4-4d2b49475cc5";
  private _APPARTENANCE_NADEGE_GUID = "3841747d-8e40-4de8-acd4-4d2b49475cc4";
  private _APPARTENANCE_THOMAS_GUID = "3841747d-8e40-4de8-acd4-4d2b49475cc3";

  private readonly _MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Auout", "Septembre", "Octobre", "Novembre", "Decembre"
  ];
  public constructor(
    private _syntheseService: SyntheseService,
    private _colorService: DisplayConfigurationService
  ) {
    this.quiChartOptions = this.createDataForPolarReaGraph(null);
    const d = new Date();
    this.month = this._MONTH_NAMES[d.getMonth()];

  }

  ngOnInit(): void {
    this.isLoadingQui = true;
    this.isLoadingCommun = true;
    this.isLoadingJean = true;
    this.isLoadingThomas = true;
    this.isLoadingNadege = true;
    this.isLoadingGlobal = true;

    this._syntheseService.getExpenseGlobal().subscribe(
      (data: SyntheseDepenseGlobal) => {
        this.isLoadingGlobal = false;
        this.globalChartOptions = this.createDataForGlobalGraph(data);
      });


    this._syntheseService.getExpenseGroupByAppartenance().subscribe(
      (data: SyntheseDepenseModel) => {
        this.isLoadingQui = false;
        this.quiChartOptions = this.createDataForPolarReaGraph(data);
      });
    this._syntheseService.getExpenseGroupByGroups(this._APPARTENANCE_COMMUN_GUID).subscribe(
      (data: SyntheseDepenseByAppartenanceModel) => {
        console.log("Retour du WS commun OK");
        console.log(data);

        this.isLoadingCommun = false;
        this.communChartOptions = this.createDataForAppartenanceGraph(data, true);
      });

    this._syntheseService.getExpenseGroupByGroups(this._APPARTENANCE_JEAN_GUID).subscribe(
      ({
        next: (dataJean: SyntheseDepenseByAppartenanceModel) => {
          this.isLoadingJean = false;
          if(!dataJean){
            console.log("Retour du WS jean à que dale ???");
          } else{
            console.log("Retour du WS jean OK");
            console.log(dataJean);
          }
          this.jeanChartOptions = this.createDataForAppartenanceGraph(dataJean, false);
        },

        error: (data: any) => {
          this.isLoadingJean = false;
          // console.log("Erreur dans le getExpenseGroupByGroups de Jean");
          // console.log('Erreur stringifiee-> ' + JSON.stringify(data));
          // console.log(data);
        },
        complete: () => {
          console.log("get Appartenance Completed pour Jean");
          //Dummy in this version.
        }
      }));



    this._syntheseService.getExpenseGroupByGroups(this._APPARTENANCE_NADEGE_GUID).subscribe(
      (data: SyntheseDepenseByAppartenanceModel) => {
        this.isLoadingNadege = false;
        this.nadegeChartOptions = this.createDataForAppartenanceGraph(data, false);
      });
    this._syntheseService.getExpenseGroupByGroups(this._APPARTENANCE_THOMAS_GUID).subscribe(
      (data: SyntheseDepenseByAppartenanceModel) => {
        this.isLoadingThomas = false;
        this.thomasChartOptions = this.createDataForAppartenanceGraph(data, false);
      });


  }
  createDataForGlobalGraph(input: SyntheseDepenseGlobal): any {
    let retour = null;
    if (input) {

      let xLabels: string[] = ["Prévu", "Réel"];
      let yPrevus: number[] = [Math.round(input.budgetValuePrevu)];
      let yConsommes: number[] = [Math.round(input.budgetValueDepense)];
      let prevuColor = this._colorService.getExpectedColor();   
      let consommeColor = this._colorService.getBackgroundColor(input.status);
      retour = {
        series: [
          {
            name: "Prévu",
            data: yPrevus,
            color: prevuColor
          },
          {
            name: "Consommé",
            data: yConsommes,
            consommeColor

          }
        ],
        chart: {
          type: "bar",
          height: 200
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: "12px",
            colors: ["#000"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: xLabels
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 0
        }
      };
    } 
    return retour;
  }

  createDataForPolarReaGraph(input: SyntheseDepenseModel | null): any {
    let retour = null;
    if (input) {
      let backgroundColorValue = this._colorService.getBackgroundColor(input.status);
      let borderColorValue = this._colorService.getBorderColor(input.status);
      let polarDataConsommee = [];
      let polarData100Pourcent = [];
      let borderColor = [];
      let backgroundColor = [];
      let polarLabels = [];
      const dataLength = input.data.length;
      for (let i = 0; i < dataLength; i++) {
        polarDataConsommee.push(Math.round(input.data[i].budgetPourcentageDepense));
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
            color: backgroundColorValue,
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
          enabled: true,
        },
      };
    }
    return retour;
  }

  createDataForAppartenanceGraph(input: SyntheseDepenseByAppartenanceModel | null, isBar : boolean): any {
    let retour = null;
    let typeGraph = "area";
    if(isBar){
      typeGraph = "bar";
    }
    if (input) {

      let xLabels: string[] = [];
      let yPrevus: number[] = [];
      let yConsommes: number[] = [];
      let prevuColor: string[] = [];
      let consommeColor: string[] = [];
      let nbLine = 0;
      input.data?.forEach(iter => {
        nbLine++;
        let label = iter.groupCaption;
        if (!label) {
          label = "NC";
        }
        xLabels.push(label);
        yPrevus.push(Math.round(iter.budgetValuePrevu));
        yConsommes.push(Math.round(iter.budgetValueDepense));

        
        prevuColor.push(this._colorService.getExpectedColor());
        consommeColor.push(this._colorService.getBackgroundColor(iter?.status));
        
      });
      retour = {
        series: [
          {
            name: "Prévu",
            data: yPrevus,
            color: "rgba(60,179,113,0.4)" 
            //color: prevuColor
          },
          {
            name: "Consommé",
            data: yConsommes,
            color: "rgba(120,10,13,0.4)" 

          }
        ],
        chart: {
          type: typeGraph,
          height: nbLine * 70
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: "12px",
            colors: ["#000"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: xLabels
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 0
        }
      };
    } else {
      console.log("Que dale ???");
    }



    return retour;

  }

 

}

