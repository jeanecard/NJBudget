export interface CompteOperationModel {
    id: string | null;
    compteId: string;
    dateOperation: Date;
    value: number;
    caption: string;
}
