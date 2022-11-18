import { Observable, of, throwError } from 'rxjs';
import { Client, Folder, Country, ProjectFile } from '../common/model';
import { IObservableServices } from '../external/iobservableServices';

/**
 * Services connected to external endpoint
 *
 * En cas d'erreur l'observable émet Error contenant le message d'erreur
 * Les fonctions peuvent aussi lancer une exception au lieu de retourner l'Observable
 *
 * (code externe, on ne peut pas modifier le code)
 */
export class ObservableServicesMock extends IObservableServices {
  FindCountry(name: string): Observable<Country> {
    console.log(`FindPays ${name}`);
    if (name.toLowerCase().indexOf('palombiana') != -1) return throwError(() => new Error('unknown country'));
    if (name.toLowerCase().indexOf('pays maudis') != -1) throw new Error('schtroumpf overcrowded');
    return of(new Country());
  }

  GetClient(pays: Country, name: string): Observable<Client> {
    console.log(`GetClient ${name}`);
    if (name.toLowerCase().indexOf('bath') != -1) return throwError(() => new Error('client data restricted'));
    return of(new Client(), new Client());
  }

  FindBox(pays: Client, numero: number): Observable<Folder> {
    console.log(`FindDossier ${numero}`);
    if (numero == 666) return throwError(() => new Error('666 folder not allowed'));
    return of(new Folder());
  }

  FindFile(dossier: Folder, name: string): Observable<ProjectFile> {
    console.log(`FindFile ${name}`);
    if (name.toLowerCase().startsWith('x file')) throw new Error('x file not permitted');
    if (name == 'numeros du loto de vendredi prochain.txt') return throwError(() => new Error('tu reves'));

    return of(new ProjectFile());
  }

  GetLocalisation(file: ProjectFile): Observable<string> {
    console.log(`GetLocalisation`);
    return of('Chapelle de Rosslyn');
  }
}
