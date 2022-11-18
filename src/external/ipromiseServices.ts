import { Client, Folder, Country, ProjectFile } from '../common/model';

/**
 * Services externes utilisant des promises
 *
 * En cas d'erreur une excepion avec le message d'erreur est lancée
 *
 * (code externe, on ne peut pas modifier le code)
 */
export abstract class IPromiseServices {
  abstract FindCountry(name: string): Promise<Country>;

  abstract GetClient(pays: Country, name: string): Promise<Client>;

  abstract FindBox(pays: Client, numero: number): Promise<Folder>;

  abstract FindFile(dossier: Folder, name: string): Promise<ProjectFile>;

  abstract GetLocalisation(file: ProjectFile): Promise<string>;
}
