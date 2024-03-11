export function init() {
    loadTextMove();
    initPortfolioScripts();
}

function loadTextMove(): void {
    const text: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.text-move');
    const root: HTMLElement = document.documentElement;
    text.forEach((t: HTMLElement) => {
        root.addEventListener('mousemove', (e: MouseEvent) => {
            const x: number = e.clientX;
            const y: number = e.clientY;
            t.style.transform = `translate(${-x / 100}px,${-y / 100}px)`;
        });
    });
}

function initPortfolioScripts() {
    document.querySelectorAll<HTMLElement>('.project').forEach((project: HTMLElement) => {
        project.addEventListener('mouseover', (e: MouseEvent) => {
            let id: string = (e.target as EventTarget & HTMLElement).dataset.index || '';
            let project: HTMLElement | null = document.querySelector<HTMLElement>(`#proj--${id}`);
            if (project) {
                project.classList.remove('opacity-0');
            }
        });
        project.addEventListener('mouseout', (e: MouseEvent) => {
            let id: string = (e.target as EventTarget & HTMLElement).dataset.index || '';
            let project: HTMLElement | null = document.querySelector<HTMLElement>(`#proj--${id}`);
            if (project) {
                project.classList.add('opacity-0');
            }
        });
    });
}
