import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';  // Removed withDebugTracing import
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Removed withDebugTracing()
    ...appConfig.providers
  ]
}).catch(err => console.error(err));