import { StateCompte } from "./state-compte";

export interface SyntheseDepenseModelItem {
    appartenanceId: string;
    appartenanceCaption : string | null;
    budgetValuePrevu: number;
    budgetValueDepense: number;
    budgetPourcentageDepense: number;
    status: StateCompte;
}

export interface SyntheseDepenseModel {
    data: SyntheseDepenseModelItem[];
    status: StateCompte;
}
