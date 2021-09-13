import { CompteOperationModel } from "./compte-operation-model";
import { OperationType } from "./operation-type";
import { StateCompte } from "./state-compte";

export interface CompteModel {
    id:string;
    caption: string;
    groupId: string;
    budgetExpected: number;
    budgetSpent: number;
    budgetLeft: number;
    operations: CompteOperationModel[];
    state: StateCompte;
    operationAllowed: OperationType;
}
