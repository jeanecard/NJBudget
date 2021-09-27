import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayIconService {
  
  private _correspondingUrl = {
    Commission: "./assets/icons/commission.svg",
    Impot: "./assets/icons/impot.svg",
    Telephone: "./assets/icons/telephone.svg",
    Internet: "./assets/icons/internet.svg",
    Essence: "./assets/icons/essence.svg",
    Electrecite: "./assets/icons/electrecite.svg",
    Eau: "./assets/icons/eau.svg",
    Credit: "./assets/icons/bank.svg",
    Animaux: "./assets/icons/animaux.svg",
    Chauffage: "./assets/icons/bois.svg",
    Véhicules: "./assets/icons/entretien.svg",
    Vacances: "./assets/icons/loisir.svg",
    Epargne: "./assets/icons/epargne.svg",
    Assurance: "./assets/icons/assurance.svg",
    Transport: "./assets/icons/transport.svg",
    Vetements: "./assets/icons/vetement.svg",
    Loisir: "./assets/icons/loisir.svg",
    Coiffeur: "./assets/icons/coiffeur.svg",
    Cantine: "./assets/icons/cantine.svg",
    Commun: "./assets/icons/house.svg",
    Jean: "./assets/icons/jean.svg",
    Nadege: "./assets/icons/nad.svg",
    Thomas: "./assets/icons/boy.svg"
  };
  
  
  constructor() { }

  public getURL(caption: string): string {
    // @ts-ignore
    let correspondingUrl = this._correspondingUrl[caption];
    if (correspondingUrl) {
      return correspondingUrl;
    }
    return "";
  }
}

