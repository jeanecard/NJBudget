import { CompteOperationModel } from "./compte-operation-model";
import { Group } from "./group";
import { OperationType } from "./operation-type";
import { StateCompte } from "./state-compte";

export interface CompteModel {
    group: Group;
    budgetExpected: number;
    budgetConsummed: number;
    budgetEpargne : number;
    budgetLeft: number;
    operations: CompteOperationModel[];
    state: StateCompte;
    operationAllowed: OperationType;
    balance: number;
}
