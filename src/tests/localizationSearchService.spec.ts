import { LocalizationSearchServicePromise } from '../core/localizationSearchServicePromise';
import { LocalizationSearchServiceObservable } from '../core/localizationSearchServiceObservable';
import { ObservableServicesMock } from './observableServicesMock';
import { PromiseServicesMock } from './promiseServicesMock';
import { ILocalizationSearchServicePromise } from '../abstract/ilocalizationSearchServicePromise';
import { ILocalizationSearchServiceObservable } from '../abstract/ilocalizationSearchServiceObservable';
import { LocalizationSearchServiceObservableConcatmap } from '../core/localizationSearchServiceObservableConcatmap';

describe('TestLocalizationSearchService', () => {
  let localizationServicePromise: ILocalizationSearchServicePromise;
  let localizationServiceObservable: ILocalizationSearchServiceObservable;
  let localizationServiceObservableConcatmap: ILocalizationSearchServiceObservable;

  beforeEach(() => {
    localizationServicePromise = new LocalizationSearchServicePromise(new PromiseServicesMock());
    localizationServiceObservable = new LocalizationSearchServiceObservable(new ObservableServicesMock());
    localizationServiceObservableConcatmap = new LocalizationSearchServiceObservableConcatmap(new ObservableServicesMock());
  });

  const errorCheckList = [
    {
      description: 'should not allow searching de la bath',
      input: ['Egypte', 'Hubert Bonisseur de la Bath', 123456, 'Where is Jack.txt'],
      expectedError: 'client data restricted',
    },
    {
      description: 'should not know republica palombiana',
      input: ['Republica Palombiana', 'Celine Dion', 123456, 'X File.pdf'],
      expectedError: 'unknown country',
    },
    {
      description: 'should throw on invalid country',
      input: ['Le Pays Maudis', 'Azrael', 1, 'grimoire de Gargamel.doc'],
      expectedError: 'schtroumpf overcrowded',
    },
    {
      description: 'should not allow searching x file',
      input: ['France', 'Francis Lalane', 123456, 'X File.pdf'],
      expectedError: 'x file not permitted',
    },
    {
      description: 'should not allow searching folder 666',
      input: ['Langdarg', 'Francis Lalane', 666, 'Le chemin du paradis.pdf'],
      expectedError: '666 folder not allowed',
    },
    {
      description: 'should not allow give lottery results',
      input: ['France', 'FDJ', 777, 'numeros du loto de vendredi prochain.txt'],
      expectedError: 'tu reves',
    },
  ];

  // SUITE PROMISE

  describe('getFileLocalizationPromise', () => {
    it('should return the localization', async () => {
      console.warn('getFileLocalizationPromise: should return the localization');
      // act
      let country = await localizationServicePromise.getFileLocalization(
        'France',
        'Francis Lalane',
        123456,
        'Variant Lalane.pdf'
      );

      // assert
      expect(country).toBe('Chapelle de Rosslyn');
    });

    errorCheckList.forEach((p) => {
      it(p.description, async () => {
        console.warn(`getFileLocalizationPromise: ${p.description}}]`);
        // act
        try {
          let country = await localizationServicePromise.getFileLocalization(...(p.input as [string, string, number, string]));
        } catch (ex) {
          // assert
          expect(ex.message).toBe(p.expectedError);
        }
      });
    });
  });

  // SUITE OBSERVABLE

  describe('getFileLocalizationObservable', () => {
    it('should return the localization', (done) => {
      console.warn('getFileLocalizationObservable: should return the localization');
      // arrange
      expect(1);

      // act
      let country = localizationServiceObservable
        .getFileLocalization('France', 'Francis Lalane', 123456, 'Variant Lalane.pdf')
        .subscribe((country) => {
          // assert
          expect(country).toBe('Chapelle de Rosslyn');
          done();
        });
    });

    errorCheckList.forEach((p) => {
      it(p.description, (done) => {
        console.warn(`getFileLocalizationObservable: ${p.description}}]`);
        // act
        let country = localizationServiceObservable
          .getFileLocalization(...(p.input as [string, string, number, string]))
          .subscribe({
            error: (err) => {
              // assert
              expect(err.message).toBe(p.expectedError);
              done();
            },
            complete: () => expect(true).toBe(false),
            next: (val) => expect(true).toBe(false),
          });
      });
    });
  });

  // SUITE OBSERVABLE CONCATMAP

  describe('getFileLocalizationObservableConcatmap', () => {
    it('should return the localization', (done) => {
      // arrange
      expect(1);

      // act
      let country = localizationServiceObservableConcatmap
        .getFileLocalization('France', 'Francis Lalane', 123456, 'Variant Lalane.pdf')
        .subscribe((country) => {
          // assert
          expect(country).toBe('Chapelle de Rosslyn');
          done();
        });
    });

    errorCheckList.forEach((p) => {
      it(p.description, (done) => {
        // act
        let country = localizationServiceObservableConcatmap
          .getFileLocalization(...(p.input as [string, string, number, string]))
          .subscribe({
            error: (err) => {
              // assert
              expect(err.message).toBe(p.expectedError);
              done();
            },
            complete: () => expect(true).toBe(false),
            next: (val) => expect(true).toBe(false),
          });
      });
    });
  });
});
