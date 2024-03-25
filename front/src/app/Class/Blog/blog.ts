// Définition de la classe Blog
export class Blog {
  private _Id_Blog: number;
  private _Public: boolean;
  private _Titre: string;
  private _DateCreation: Date;
  private _Descriptif: string;
  private _Id_Utilisateur: number;

  // Constructeur de la classe Blog prenant un objet 'blog' en paramètre
  constructor(blog:any) {
    // Initialisation des propriétés avec les valeurs de l'objet 'blog'
    this._Id_Blog = blog.Id_Blog;
    this._Public = blog.Public;
    this._Titre = blog.Titre;
    this._DateCreation = blog.DateCreation;
    this._Descriptif = blog.Descriptif;
    this._Id_Utilisateur = blog.Id_Utilisateur;
  }

  // Méthodes d'accès (getters) et de modification (setters) des propriétés de la classe

  // Getter et setter pour Id_Blog
  get Id_Blog(): number {
    return this._Id_Blog;
  }

  set Id_Blog(value: number) {
    this._Id_Blog = value;
  }

  // Getter et setter pour Public
  get Public(): boolean {
    return this._Public;
  }

  set Public(value: boolean) {
    this._Public = value;
  }


  // Getter et setter pour Titre
  get Titre(): string {
    return this._Titre;
  }

  set Titre(value: string) {
    this._Titre = value;
  }

  // Getter et setter pour DateCreation
  get DateCreation(): Date {
    return this._DateCreation;
  }

  set DateCreation(value: Date) {
    this._DateCreation = value;
  }

  // Getter et setter pour Descriptif
  get Descriptif(): string {
    return this._Descriptif;
  }

  set Descriptif(value: string) {
    this._Descriptif = value;
  }

  // Getter et setter pour Id_Utilisateur
  get Id_Utilisateur(): number {
    return this._Id_Utilisateur;
  }

  set Id_Utilisateur(value: number) {
    this._Id_Utilisateur = value;
  }
}
