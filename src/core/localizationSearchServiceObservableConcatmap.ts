import { concatMap, Observable, tap, throwError } from 'rxjs';
import { ILocalizationSearchServiceObservable } from '../abstract/ilocalizationSearchServiceObservable';
import { IObservableServices } from '../external/iobservableServices';

export class LocalizationSearchServiceObservableConcatmap extends ILocalizationSearchServiceObservable {
  constructor(private obsSer: IObservableServices) {
    super();
  }

  /**
   * Recherche de la localization d'un fichier client
   *
   * @remark cette méthode répond à la spécification de l'interface ILocalizationSearchService
   *
   * Le bloc de chaque subscribe doit être entouré d'un try..catch afin de remonter une erreur
   * dans le cas où la localization de peut être remontée.
   * Un cas d'erreur peut être la levée d'une exception provenant de cette méthode,
   * d'une méthode de observableServices, de toute librairie utilitaire référencée employée par
   * observableServices, ou bien une exception bas niveau type 'heap out of memory' error.
   */
  getFileLocalization(nomPays: string, nomClient: string, numDossier: number, nomFichier: string): Observable<string> {
    try {
      return this.obsSer.FindCountry(nomPays).pipe(
        concatMap((pays) => {
          // récupération du client
          return this.obsSer.GetClient(pays, nomClient);
        }),

        concatMap((client) => {
          // recherche du dossier
          return this.obsSer.FindBox(client, numDossier);
        }),
        concatMap((dossier) => {
          // recherche du fichier
          return this.obsSer.FindFile(dossier, nomFichier);
        }),
        concatMap((file) => {
          // getting localization
          return this.obsSer.GetLocalisation(file);
        })
      );
    } catch (err) {
      return throwError(() => err);
    }
  }
}
