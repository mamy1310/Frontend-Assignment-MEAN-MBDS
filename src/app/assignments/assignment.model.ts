export class Assignment {
  // tslint:disable-next-line:variable-name
  _id?: string;
  id: number;
  nom: string;
  dateDeRendu: Date;
  rendu: boolean;
  note?: number;
  remarque?: string;
  matiere: any;
}
