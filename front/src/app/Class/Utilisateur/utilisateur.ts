export class Utilisateur {
  private _id_Utilisateur: number;
  private _nom: string;
  private _email: string;
  private _prenom: string;
  private _numero: number;


  constructor(utilisateur: any) {
    this._id_Utilisateur = utilisateur.Id_Utilisateur;
    this._nom = utilisateur.Nom;
    this._email = utilisateur.Email;
    this._prenom = utilisateur.Prenom;
    this._numero = utilisateur.Numero;
  }

  get id_Utilisateur(): number {
    return this._id_Utilisateur;
  }

  set id_Utilisateur(value: number) {
    this._id_Utilisateur = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    this._numero = value;
  }
}
