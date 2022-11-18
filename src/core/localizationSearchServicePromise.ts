import { ILocalizationSearchServicePromise } from '../abstract/ilocalizationSearchServicePromise';
import { IPromiseServices } from '../external/ipromiseServices';

export class LocalizationSearchServicePromise extends ILocalizationSearchServicePromise {
  constructor(private proSer: IPromiseServices) {
    super();
  }

  /**
   * Recherche de la localization d'un fichier client
   *
   * @remark cette méthode répond à la spécification de l'interface ILocalizationSearchService
   */
  async getFileLocalization(nomPays: string, nomClient: string, numDossier: number, nomFichier: string): Promise<string> {
    // recheche du pays
    let pays = await this.proSer.FindCountry(nomPays);

    // récupération du client
    let client = await this.proSer.GetClient(pays, nomClient);

    // recherche du dossier
    let dossier = await this.proSer.FindBox(client, numDossier);

    // recherche du fichier
    let file = await this.proSer.FindFile(dossier, nomFichier);

    // getting localization
    return await this.proSer.GetLocalisation(file);
  }
}
