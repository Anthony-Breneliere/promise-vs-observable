import { Observable } from 'rxjs';

export abstract class ILocalizationSearchServiceObservable {
  /**
   * Retourne la localization d'un fichier à partir du nom de pays, du client,
   * du numéro de dosser et du nom de fichier
   *
   * @returns Observable that emits the localization, then complete.
   * Otherwise it emits an error with the message of the cause of the error.
   *
   * @remark The code is run on the subscribe() call on the observer, it is why
   * the error requires to be emmited by the observable.
   */
  public abstract getFileLocalization( nomPays: string, nomClient: string, numDossier: number, nomFichier: string ): Observable<string>;
}
