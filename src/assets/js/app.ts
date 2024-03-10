// Htmx
import 'htmx.org';

// Analytics
// import * as gtm from './Analytics/init.ts';

// Cookie Consent
// import * as CookieConsent from './CookieConsent/init.ts';

import * as Animations from './utils/animations.ts';
import * as Navigation from './utils/navigation.ts';

document.addEventListener('DOMContentLoaded', () => {
    Navigation.initNavigation();

    // Initialize Animations
    Animations.loadTextMove();

    // Re-initialize Animations on htmx:load
    document.addEventListener('htmx:load', (event) => {
        Animations.loadTextMove();
        Animations.initPortfolioScripts();
    });
});
