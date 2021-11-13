import { StateCompte } from "./state-compte";

export interface SyntheseDepenseModelItem {
    appartenanceId: string;
    appartenanceCaption : string | null;
    budgetValuePrevu: number;
    budgetValueDepense: number;
    budgetPourcentageDepense: number;
    status: StateCompte;
    epargne : number;
    provision: number;
    depensePure: number;
    balance: number;
}

export interface SyntheseDepenseModel {
    data: SyntheseDepenseModelItem[];
    status: StateCompte;
}
