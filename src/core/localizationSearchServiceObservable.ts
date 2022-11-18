import { Observable } from 'rxjs';
import { ILocalizationSearchServiceObservable } from '../abstract/ilocalizationSearchServiceObservable';
import { IObservableServices } from '../external/iobservableServices';

export class LocalizationSearchServiceObservable extends ILocalizationSearchServiceObservable {
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
    return new Observable<string>((subscriber) => {
      try {
        // recheche du pays
        this.obsSer.FindCountry(nomPays).subscribe({
          next: (pays) => {
            try {
              // récupération du client
              this.obsSer.GetClient(pays, nomClient).subscribe({
                next: (client) => {
                  try {
                    // recherche du dossier
                    this.obsSer.FindBox(client, numDossier).subscribe({
                      next: (dossier) => {
                        try {
                          // recherche du fichier
                          this.obsSer.FindFile(dossier, nomFichier).subscribe({
                            next: (file) => {
                              try {
                                // getting localization
                                this.obsSer.GetLocalisation(file).subscribe({
                                  next: (localisation) => {
                                    try {
                                      subscriber.next(localisation);
                                    } catch (err) {
                                      subscriber.error(err);
                                    }
                                  },
                                  error: (err) => subscriber.error(err),
                                  complete: () => subscriber.complete(),
                                });
                              } catch (err) {
                                subscriber.error(err);
                              }
                            },
                            error: (err) => subscriber.error(err),
                          });
                        } catch (err) {
                          subscriber.error(err);
                        }
                      },
                      error: (err) => subscriber.error(err),
                    });
                  } catch (err) {
                    subscriber.error(err);
                  }
                },
                error: (err) => subscriber.error(err),
              });
            } catch (err) {
              subscriber.error(err);
            }
          },
          error: (err) => subscriber.error(err),
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }
}
