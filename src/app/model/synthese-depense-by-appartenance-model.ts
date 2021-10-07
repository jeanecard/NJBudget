import { StateCompte } from "./state-compte";

export interface SyntheseDepenseByAppartenanceModel {
    appartenanceId : string;
    appartenanceCaption : string;
    data: SyntheseDepenseByAppartenanceModelItem[];
}

export interface SyntheseDepenseByAppartenanceModelItem {
    groupId: string;
    groupCaption : string | null;
    budgetValuePrevu: number;
    budgetValueDepense: number;
    budgetPourcentageDepense: number;
    status: StateCompte;
}