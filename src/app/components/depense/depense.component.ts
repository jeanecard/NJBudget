import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompteModel } from 'src/app/model/compte-model';
import { CompteOperationModel } from 'src/app/model/compte-operation-model';
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
  public dataSource: CompteOperationModel[] = [];
  public compteModel: CompteModel | null = null;
  public compteChartOptions: any = null;
  public valeurForm: FormControl;
  public descriptionForm: FormControl;


  constructor(
    private compteService: CompteService,
    private notifyService: NotificationService,
    private _displayConfService: DisplayConfigurationService) {
    this.valeurForm = new FormControl(null, Validators.required);
    this.descriptionForm = new FormControl();
  }

  ngOnInit(): void {
    this.compteService.getCompte("1").subscribe(
      (data: CompteModel) => {
        this.setModelToView(data);
      });
  }

  onDeleteRow(input: any): void {
    console.log(input);
  }

  public addOperation(): void {
    if (!this.compteModel || !this.valeurForm.value) {
      this.notifyService.showWarning("Veuillez sélectionner un montant", "NJ app");
      this.valeurForm.markAsTouched();
      return;
    }
    let operation = this.getOperation();
    if (operation) {
      this.compteService.addOperation(operation, this.compteModel).subscribe(
        (data: CompteModel) => {
          this.notifyService.showSuccess("Opération gain de " + this.valeurForm.value + " euros prise en compte", "NJ app");
          this.setModelToView(data);
          this.descriptionForm.reset();
          this.valeurForm.reset();
        });
    }
  }

  public removeOperation(): void {
    console.log(this.valeurForm.value);
    if (!this.compteModel  || !this.valeurForm.value) {
      this.notifyService.showWarning("Veuillez sélectionner un montant", "NJ app");      
      this.valeurForm.markAsTouched();      
      return;
    }
    let operation = this.getOperation();
    if (operation) {
      this.compteService.removeOperation(operation, this.compteModel).subscribe(
        (data: CompteModel) => {
          this.notifyService.showSuccess("Opération retrait de " + this.valeurForm.value + " euros prise en compte", "NJ app");
          this.setModelToView(data);
          this.descriptionForm.reset();
          this.valeurForm.reset();
        });
    }
  }

  private setModelToView(data: CompteModel) {
    this.compteModel = data;
    this.dataSource = [];

    data?.operations?.forEach(e => {
      this.dataSource.push(e);
    });
    this.updateGraph();
  }

  private getOperation(): CompteOperationModel | null {
    let operation: CompteOperationModel | null = null;
    if (this.compteModel) {
      operation = {
        caption: this.descriptionForm?.value,
        compteId: this.compteModel.id,
        dateOperation: new Date(),
        id: null,
        value: this.valeurForm?.value
      };
    }
    return operation;
  }

  private updateGraph(): void {
    if (!this.compteModel) {
      this.compteChartOptions = {};
    } else {
      let compteReelColor = this._displayConfService.getBackgroundColor(this.compteModel.state);
      let compteExpectedColor = this._displayConfService.getExpectedColor();
      this.compteChartOptions =
      {
        series: [
          {
            name: "Prévu ",
            data: [this.compteModel.budgetExpected],
            color: compteExpectedColor,
          },
          {
            name: "Réel",
            data: [this.compteModel.budgetSpent],
            color: compteReelColor,
          }
        ],
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'center',
              hideOverflowingLabels: true,
              orientation: "horizontal"
            }
          }
        },
        chart: {
          height: 180,
          type: "bar"
        },
        fill: {
          opacity: 0.4
        },
        xaxis: {
          categories: ["Sept."],
          labels: {
            show: false,
          }
        }
      };
    }
  }

  public getMonthLocal(
    inputMonthIndex: number,
    locale?: string): string {
    const year = new Date().getFullYear(); // 2020
    const monthList = [...Array(12).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "short"
    });

    const getMonthName = formatter.format(new Date(2000, inputMonthIndex));

    return getMonthName;
  }
}
