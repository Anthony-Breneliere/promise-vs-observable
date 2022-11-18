export abstract class ILocalizationSearchServicePromise {
  /**
   * Retourne la localization d'un fichier à partir du nom de pays, du client,
   * du numéro de dossier et du nom de fichier
   *
   * @returns the localization
   * @throws error if the localization could not be returned, with the message of the cause of the error
   */
  public abstract getFileLocalization( nomPays: string, nomClient: string, numDossier: number, nomFichier: string ): Promise<string>;
}
