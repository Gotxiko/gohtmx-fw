import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';

import CookieConsent from '../CookieConsent/init';

const analytics = Analytics({
    app: 'my-app-name',
    plugins: [
        googleTagManager({
            containerId: 'GTM-XXXXXXX',
        }),
    ],
});

if (CookieConsent.acceptedCategory('analytics')) {
    console.log('Analytics are accepted.');
}

export default analytics;
