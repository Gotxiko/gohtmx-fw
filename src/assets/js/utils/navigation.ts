export function init() {
    navigationCheckboxes();
}

function navigationCheckboxes() {
    document.querySelectorAll('button').forEach((button: HTMLElement) => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('button').forEach((button: HTMLElement) => {
                let span = button.querySelector('span:first-child');
                if (span) {
                    span.classList.remove('bg-black');
                }
            });
            if (e.target) {
                let targetElement = (<HTMLElement>e.target).tagName.toLowerCase() === 'button' ? e.target : (<HTMLElement>e.target).parentElement;
                if (targetElement) {
                    let targetSpan = (<HTMLElement>targetElement).querySelector('span:first-child');
                    if (targetSpan) {
                        targetSpan.classList.add('bg-black');
                    }
                }
            }
        });
    });
}
