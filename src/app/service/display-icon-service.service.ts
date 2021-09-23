import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayIconService {
  
  private _correspondingUrl = {
    Commission: "./assets/icons/commission.png",
    Impot: "./assets/icons/impot.png",
    Telephone: "./assets/icons/telephone.png",
    Internet: "./assets/icons/internet.png",
    Essence: "./assets/icons/essence.png",
    Electrecite: "./assets/icons/electrecite.png",
    Eau: "./assets/icons/eau.png",
    Credit: "./assets/icons/bank.png",
    Animaux: "./assets/icons/animaux.png",
    Chauffage: "./assets/icons/bois.png",
    Véhicules: "./assets/icons/entretien.png",
    Vacances: "./assets/icons/loisir.png",
    Epargne: "./assets/icons/epargne.png",
    Assurance: "./assets/icons/assurance.png",
    Transport: "./assets/icons/transport.png",
    Vetements: "./assets/icons/vetement.png",
    Loisir: "./assets/icons/loisir.png",
    Coiffeur: "./assets/icons/coiffeur.png",
    Cantine: "./assets/icons/cantine.png",
    Commun: "./assets/icons/house.png",
    Jean: "./assets/icons/jean.png",
    Nadege: "./assets/icons/nad.png",
    Thomas: "./assets/icons/boy.png"
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

