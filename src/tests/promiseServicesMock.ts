import { Client, Folder, Country, ProjectFile } from '../common/model';

/**
 * Services externes utilisant des promises
 *
 * En cas d'erreur une excepion avec le message d'erreur est lancée
 *
 * (code externe, on ne peut pas modifier le code)
 */
export class PromiseServicesMock {
  async FindCountry(name: string): Promise<Country> {
    if (name.toLowerCase().indexOf('palombiana') != -1) throw new Error('unknown country');
    if (name.toLowerCase().indexOf('pays maudis') != -1) throw new Error('schtroumpf overcrowded');

    return new Country();
  }

  async GetClient(pays: Country, name: string): Promise<Client> {
    if (name.toLowerCase() == 'neo') throw new Error('stack overflow');

    if (name.toLowerCase().indexOf('bath') != -1) throw new Error('client data restricted');

    return new Client();
  }

  async FindBox(pays: Client, numero: number): Promise<Folder> {
    if (numero == 666) throw new Error('666 folder not allowed');

    return new Folder();
  }

  async FindFile(dossier: Folder, name: string): Promise<ProjectFile> {
    if (name.toLowerCase().startsWith('x file')) throw new Error('x file not permitted');
    if (name == 'numeros du loto de vendredi prochain.txt') throw new Error('tu reves');

    return new ProjectFile();
  }

  async GetLocalisation(file: ProjectFile): Promise<string> {
    console.log('trace depuis promise:');
    console.trace();
    return 'Chapelle de Rosslyn';
  }
}
