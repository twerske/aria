import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    // if (window['ngRef']) {
    //   window['ngRef'].destroy();
    // }
    // window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
