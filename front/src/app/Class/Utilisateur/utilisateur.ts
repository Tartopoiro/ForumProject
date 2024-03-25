// Définition de la classe Utilisateur
export class Utilisateur {
  private _id_Utilisateur: number;
  private _nom: string;
  private _email: string;
  private _prenom: string;
  private _numero: number;


  // Constructeur de la classe Utilisateur prenant un objet 'utilisateur' en paramètre
  constructor(utilisateur: any) {
    // Initialisation des propriétés de la classe avec les valeurs de l'objet utilisateur
    this._id_Utilisateur = utilisateur.Id_Utilisateur;
    this._nom = utilisateur.Nom;
    this._email = utilisateur.Email;
    this._prenom = utilisateur.Prenom;
    this._numero = utilisateur.Numero;
  }

  // Méthodes d'accès (getters) et de modification (setters) des propriétés de la classe

  // Getter et setter pour _id_Utilisateur
  get id_Utilisateur(): number {
    return this._id_Utilisateur;
  }

  set id_Utilisateur(value: number) {
    this._id_Utilisateur = value;
  }

  // Getter et setter pour _nom
  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  // Getter et setter pour _email
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  // Getter et setter pour _prenom
  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  // Getter et setter pour _numero
  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    this._numero = value;
  }
}
