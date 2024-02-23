export default (locale: string, title: string): string => {
  return `
    <html lang="${locale}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/css/app.css" />
        <script type="module" src="/assets/js/app.js"></script>
      </head>
      <body class="w-full">
        <main class="flex h-auto w-full flex-col items-center bg-red-500 justify-center p-4">
          <h1 class="text-2xl font-bold">${title}</h1>
        </main>
      </body>
    </html>
  `;
};
