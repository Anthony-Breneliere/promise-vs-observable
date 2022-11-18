import { Observable } from 'rxjs';
import { ILocalizationSearchServiceObservable } from '../abstract/ilocalizationSearchServiceObservable';
import { ObservableServices } from '../external/observableServices';

export class LocalizationSearchService extends ILocalizationSearchServiceObservable {
  constructor(private obsSer: ObservableServices) {
    super();
  }

  /**
   * Recherche de la localization d'un fichier client
   *
   * @remark cette fonction ne répond pas à la spécification de l'interface ILocalizationSearchService car
   * aucune erreur n'est remontée en cas d'exception
   */
  getFileLocalization(nomPays: string, nomClient: string, numDossier: number, nomFichier: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      // recheche du pays
      this.obsSer.FindCountry(nomPays).subscribe((pays) => {
        // récupération du client
        this.obsSer.GetClient(pays, nomClient).subscribe((client) => {
          // recherche du dossier
          this.obsSer.FindBox(client, numDossier).subscribe((dossier) => {
            // recherche du fichier
            this.obsSer.FindFile(dossier, nomFichier).subscribe((file) => {
              // getting localization
              this.obsSer.GetLocalisation(file).subscribe((localisation) => {
                subscriber.next(localisation);
                subscriber.complete();
              });
            });
          });
        });
      });
    });
  }
}
