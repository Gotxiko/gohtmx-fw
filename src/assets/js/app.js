// Htmx
import htmx from 'htmx.org';

// Analytics
import * as gtm from './Analytics/init.js';

// Cookie Consent
import * as CookieConsent from './CookieConsent/init.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('button').forEach((button) => {
                button.querySelector('span:first-child').classList.remove('bg-black');
            });
            let targetElement =
                e.target.tagName.toLowerCase() === 'button' ? e.target : e.target.parentElement;
            targetElement.querySelector('span:first-child').classList.add('bg-black');
        });
    });
});