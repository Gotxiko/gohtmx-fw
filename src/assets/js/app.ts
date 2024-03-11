// Htmx
import 'htmx.org';

// Analytics
// import * as gtm from './Analytics/init.ts';

// Cookie Consent
// import * as CookieConsent from './CookieConsent/init.ts';

import * as Animations from './utils/animations.ts';
import * as Navigation from './utils/navigation.ts';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation scripts
    Navigation.init();

    // Initialize Animation scripts
    Animations.init();

    // Re-initialize Animations on htmx:afterSwap after DOM changes
    document.addEventListener('htmx:afterSwap', (event) => {
        Animations.init();
    });
});
