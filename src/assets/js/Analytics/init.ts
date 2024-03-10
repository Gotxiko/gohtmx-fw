import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';

import CookieConsent from 'vanilla-cookieconsent';

const analytics = Analytics({
    app: 'my-app-name',
    plugins: [googleTagManager()],
});

if (CookieConsent.acceptedCategory('analytics')) {
    console.log('Analytics are accepted.');
}

export default analytics;
