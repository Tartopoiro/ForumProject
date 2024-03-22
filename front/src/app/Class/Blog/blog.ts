export class Blog {
  private _Id_Blog: number;
  private _Public: boolean;
  private _Titre: string;
  private _DateCreation: Date;
  private _Descriptif: string;
  private _Id_Utilisateur: number;

  constructor(blog:any) {
    this._Id_Blog = blog.Id_Blog;
    this._Public = blog.Public;
    this._Titre = blog.Titre;
    this._DateCreation = blog.DateCreation;
    this._Descriptif = blog.Descriptif;
    this._Id_Utilisateur = blog.Id_Utilisateur;
  }

  get Id_Blog(): number {
    return this._Id_Blog;
  }

  set Id_Blog(value: number) {
    this._Id_Blog = value;
  }

  get Public(): boolean {
    return this._Public;
  }

  set Public(value: boolean) {
    this._Public = value;
  }

  get Titre(): string {
    return this._Titre;
  }

  set Titre(value: string) {
    this._Titre = value;
  }

  get DateCreation(): Date {
    return this._DateCreation;
  }

  set DateCreation(value: Date) {
    this._DateCreation = value;
  }

  get Descriptif(): string {
    return this._Descriptif;
  }

  set Descriptif(value: string) {
    this._Descriptif = value;
  }

  get Id_Utilisateur(): number {
    return this._Id_Utilisateur;
  }

  set Id_Utilisateur(value: number) {
    this._Id_Utilisateur = value;
  }
}
