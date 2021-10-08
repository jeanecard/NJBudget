import { Appartenance } from "./appartenance";

export interface Group {
    id:string;
    appartenance: Appartenance;
    caption: string;
}

export interface GroupUI {
    group : Group;
    urlDisplay:string;
}
