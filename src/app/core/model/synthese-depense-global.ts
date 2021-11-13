import { StateCompte } from "./state-compte";

export interface SyntheseDepenseGlobal {
    budgetValuePrevu: number;
    budgetValueDepense: number;
    status: StateCompte;
    epargne : number;
    provision: number;
    depensePure: number;
    balance: number;
}



