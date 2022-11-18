import { Observable } from 'rxjs';
import { Client, Folder, Country, ProjectFile } from '../common/model';

/**
 * Services externes utilisant des Observables
 *
 * En cas d'erreur l'observable émet Error contenant le message d'erreur
 * Les fonctions peuvent aussi lancer une exception au lieu de retourner l'Observable
 *
 * (code externe, on ne peut pas modifier le code)
 */
export abstract class IObservableServices {
  abstract FindCountry(name: string): Observable<Country>;

  abstract GetClient(pays: Country, name: string): Observable<Client>;

  abstract FindBox(pays: Client, numero: number): Observable<Folder>;

  abstract FindFile(dossier: Folder, name: string): Observable<ProjectFile>;

  abstract GetLocalisation(file: ProjectFile): Observable<string>;
}
