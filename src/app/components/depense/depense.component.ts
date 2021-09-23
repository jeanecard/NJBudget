import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CompteModel } from 'src/app/model/compte-model';
import { CompteOperationModel } from 'src/app/model/compte-operation-model';
import { OperationType } from 'src/app/model/operation-type';
import { CompteService } from 'src/app/service/compte.service';
import { DisplayConfigurationService } from 'src/app/service/display-configuration.service';
import { GroupService } from 'src/app/service/group.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepenseComponent),
      multi: true
    }
  ]  
})
export class DepenseComponent implements OnInit, ControlValueAccessor  {

  
  public displayedColumns: string[] = ['dateOperation', 'caption', 'value', 'action'];
  public dataSource: CompteOperationModel[] = [];
  public compte: CompteModel | null = null;
  public compteChartOptions: any = null;
  public valeurForm: FormControl;
  public descriptionForm: FormControl;
  public isAddOperationAllowed = true;
  public isRemoveOperationAllowed = true;
  public dateDuJour : String = new Date().toLocaleString();



  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };

  constructor(
    private _groupService: GroupService,
    private _compteService: CompteService,
    private notifyService: NotificationService,
    private _displayConfService: DisplayConfigurationService) {
    this.valeurForm = new FormControl(null, Validators.required);
    this.descriptionForm = new FormControl();

  }
  writeValue(obj: any): void {
    if(obj){
      this._groupService.getGroup(obj).subscribe(
        (data: CompteModel) => {
          this.setModelToView(data);
        });
    }

  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  ngOnInit(): void {
  }

  onDeleteRow(input: any): void {
    this._compteService.deleteOperation(input).subscribe(
      (data: CompteModel |null) => {
        if(data){
          this.setModelToView(data);
        }
      });
    }

  public addOperation(): void {
    if (!this.compte || !this.valeurForm.value) {
      this.notifyService.showWarning("Veuillez sélectionner un montant", "NJ app");
      this.valeurForm.markAsTouched();
      return;
    }
    let operation = this.getOperation();
    if (operation) {
      this._compteService.addOperation(operation, this.compte).subscribe(
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
    if (!this.compte  || !this.valeurForm.value) {
      this.notifyService.showWarning("Veuillez sélectionner un montant", "NJ app");      
      this.valeurForm.markAsTouched();      
      return;
    }
    let operation = this.getOperation();
    if (operation) {
      this._compteService.removeOperation(operation, this.compte).subscribe(
        (data: CompteModel) => {
          this.notifyService.showSuccess("Opération retrait de " + this.valeurForm.value + " euros prise en compte", "NJ app");
          this.setModelToView(data);
          this.descriptionForm.reset();
          this.valeurForm.reset();
        });
    }
  }

  private setModelToView(data: CompteModel) {
    this.dateDuJour = new Date().toLocaleString();
    this.compte = data;
    let opType = this.compte.operationAllowed;
    if(!this.compte){
      this.isAddOperationAllowed = false;
      this.isRemoveOperationAllowed = false;
    } else{
      this.isAddOperationAllowed =  opType === OperationType.AddAndDelete || opType === OperationType.AddOnly;
      this.isRemoveOperationAllowed =  opType === OperationType.AddAndDelete || opType === OperationType.DeleteOnly;
    }
    this.dataSource = [];

    data?.operations?.forEach(e => {
      this.dataSource.push(e);
    });
    this.updateGraph();
  }

  private getOperation(): CompteOperationModel | null {
    let operation: CompteOperationModel | null = null;
    if (this.compte) {
      operation = {
        caption: this.descriptionForm?.value,
        compteId: this.compte.group.id,
        dateOperation: new Date(),
        id: null,
        value: this.valeurForm?.value
      };
    }
    return operation;
  }

  private updateGraph(): void {
    if (!this.compte) {
      this.compteChartOptions = {};
    } else {
      let compteReelColor = this._displayConfService.getBackgroundColor(this.compte.state);
      let compteExpectedColor = this._displayConfService.getExpectedColor();
      this.compteChartOptions =
      {
        series: [
          {
            name: "Prévu ",
            data: [this.compte.budgetExpected],
            color: compteExpectedColor,
          },
          {
            name: "Réel",
            data: [this.compte.budgetConsummed],
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
