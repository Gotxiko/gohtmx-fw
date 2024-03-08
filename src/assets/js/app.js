// Htmx
import htmx from 'htmx.org';

// Analytics
// import * as gtm from './Analytics/init.js';

// Cookie Consent
// import * as CookieConsent from './CookieConsent/init.js';

// Vanta
import * as threejs from './libs/three.js';
// import * as VantaDots from './Vanta/vanta.dots.min.cjs';
import * as VantaFog from './Vanta/vanta.fog.min.cjs';
import * as Vanta from './Vanta/init.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('button').forEach((button) => {
                button
                    .querySelector('span:first-child')
                    .classList.remove('bg-black');
            });
            let targetElement =
                e.target.tagName.toLowerCase() === 'button'
                    ? e.target
                    : e.target.parentElement;
            targetElement
                .querySelector('span:first-child')
                .classList.add('bg-black');
        });
    });

    const text = document.querySelectorAll('.text-move'),
        root = document.documentElement;
    text.forEach((t) => {
        root.addEventListener('mousemove', (e) => {
            const x = e.clientX,
                y = e.clientY;
            t.style.transform = `translate(${-x / 100}px,${-y / 100}px)`;
        });
    });

    document.addEventListener('htmx:load', (event) => {
        document.querySelectorAll('.project').forEach((project) => {
            project.addEventListener('mouseover', (e) => {
                let id = e.target.dataset.index;
                let project = document.querySelector(`#proj--${id}`);
                if (project) {
                    project.classList.remove('opacity-0');
                }
            });
            project.addEventListener('mouseout', (e) => {
                let id = e.target.dataset.index;
                let project = document.querySelector(`#proj--${id}`);
                if (project) {
                    project.classList.add('opacity-0');
                }
            });
        });
    });
});
