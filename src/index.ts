import './style.css';
import './setup/jasmine-setup';

// tests:
import './src/tests/localizationSearchService.spec';

bootstrap();

function bootstrap() {
  if (window['jasmineRef']) {
    location.reload();
    return;
  } else {
    window.onload(undefined);
    window['jasmineRef'] = jasmine.getEnv();
  }
}
