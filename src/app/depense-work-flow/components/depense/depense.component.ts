import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CompteModel } from '../../../core/model/compte-model';
import { CompteOperationModel } from '../../../core/model/compte-operation-model';
import { OperationType } from '../../../core/model/operation-type';
import { CompteService } from '../../../core/service/compte.service';
import { DisplayConfigurationService } from '../../../core/service/display-configuration.service';
import { GroupService } from '../../../core/service/group.service';
import { InitialisationService } from '../../../core/service/initialisation.service';
import { NotificationService } from '../../../core/service/notification.service';

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
export class DepenseComponent implements OnInit, ControlValueAccessor {


  public displayedColumns: string[] = ['dateOperation', 'caption', 'value', 'action'];
  public dataSource: CompteOperationModel[] = [];
  public compte: CompteModel | null = null;
  public compteChartOptions: any = null;
  public valeurForm: FormControl;
  public descriptionForm: FormControl;
  public isAddOperationAllowed = true;
  public isRemoveOperationAllowed = true;
  public dateDuJour: String = new Date().toLocaleString();
  public isLoading = false;
  public isDeleting = false;

  public isAuthN = false;

  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };

  constructor(
    private _groupService: GroupService,
    private _compteService: CompteService,
    private notifyService: NotificationService,
    private _displayConfService: DisplayConfigurationService,
    private _initService: InitialisationService) {
    this.valeurForm = new FormControl(null, Validators.required);
    this.descriptionForm = new FormControl();

  }

  writeValue(obj: any): void {
    if (obj) {
      this.isLoading = true;
      this._groupService.getGroup(obj).subscribe(
        {
          next: (data: CompteModel) => {
            this.setModelToView(data);
            this.isLoading = false;
          },
          error : (obj : any) =>{
            this.isLoading = false;
          },
          complete : () =>{
            this.isLoading = false;
          }
        }
      );
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
    this.isDeleting = true;
    this._compteService.deleteOperation(input.id).subscribe(
      {
        next: (data: CompteModel) => {
        this.isDeleting = false;
          this.notifyService.showSuccess("Suppression effectuée", "NJ app");
          this.setModelToView(data);
        },
        error: (data: any) => {
          this.isDeleting = false;          
          this.notifyService.showError("Echec de la suppression :-(", "NJ app");
        },
        complete: () => {
          this.isDeleting = false;          
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
      this.isLoading = true;
      this._compteService.addOperation(operation).subscribe(
        (data: CompteModel) => {
          this.isLoading = false;
          this.notifyService.showSuccess("Opération gain de " + this.valeurForm.value + " euros prise en compte", "NJ app");
          this.setModelToView(data);
          this.descriptionForm.reset();
          this.valeurForm.reset();
        },
        (error: any) => {
          this.isLoading = false;
          this.notifyService.showError("Opération gain de " + this.valeurForm.value + " euros en échec", "NJ app");
        });
    }
  }

  public removeOperation(): void {
    if (!this.compte || !this.valeurForm.value) {
      this.notifyService.showWarning("Veuillez sélectionner un montant", "NJ app");
      this.valeurForm.markAsTouched();
      return;
    }
    let operation = this.getOperation();
    if (operation) {
      this.isLoading = true;
      this._compteService.removeOperation(operation).subscribe(
        (data: CompteModel) => {
          // A traiter dans un interceptor          
          this.isLoading = false;
          this.notifyService.showSuccess("Opération retrait de " + this.valeurForm.value + " euros prise en compte", "NJ app");
          this.setModelToView(data);
          this.descriptionForm.reset();
          this.valeurForm.reset();
        },
        (error: any) => {
          // A traiter dans un interceptor
          this.isLoading = false;
          this.notifyService.showError("Opération retrait de " + this.valeurForm.value + " euros en échec", "NJ app");
        }
      );
    }
  }

  private setModelToView(data: CompteModel) {
    this.dateDuJour = new Date().toLocaleString();
    this.compte = data;
    let opType = this.compte.operationAllowed;
    if (!this.compte) {
      this.isAddOperationAllowed = false;
      this.isRemoveOperationAllowed = false;
    } else {
      this.isAddOperationAllowed = opType === OperationType.AddAndDelete || opType === OperationType.AddOnly;
      this.isRemoveOperationAllowed = opType === OperationType.AddAndDelete || opType === OperationType.DeleteOnly;
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
        id: null,
        caption: this.descriptionForm?.value,
        compteId: this.compte.group.id,
        dateOperation: new Date(),
        value: this.valeurForm?.value,
        user: this._initService.getUserName()
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
          categories: [this.getMonthLocal(new Date().getMonth())],
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
