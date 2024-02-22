# Gtz Framework

This project aims to be a framework for creating simple multilanguage websites. Build custom routes with Fastify, and make use of HTMX for reactivity and requets. The project is built with EJS, SCSS and JS, and uses PM2 to keep the server running.

## Folder structure

```
.
├── dist
│
├── src
│   ├── assets
│   │   ├── css
│   │   ├── img
│   │   └── js
│
├── locales
│
├── server
│   ├── config
│   ├── database
│   ├── middleware
│   ├── routes
│   ├── utils
│   └── views
│
└── public

```

### dist

dist holds the compiled files. The .scss and .js files are compiled into the dist folder. It also holds the optimized images.

### src

src holds the source files. The .scss, .js and images are located here. The .scss files are the styles and the .js files are the scripts. Images are located in the img folder.

### locales

locales holds the translations. Each language has its own folder, and inside it, a .json file for each page. Each .json filename is the same as the route we want to translate. The .json file contains the translations for the page, as well as the filename of the ejs template to use.

For new pages, create a new .json file with the same name as the route, and add the translations for the page, as well as the template to use. Fastify routes will use the slug toload the proper ejs with the proper translations.

### server

server holds all the files that pertain to the SSR of the site.
Inside server/views, there is also a partials folder. This holds all the partials we might want to include in our other ejs files.

If you want to get a partial through a route through HTMX, make sure to create a folder with the partial name, and inside it, create a .ejs file with the same name as the route, and a langs.{LANG}.json file for the translations of that partial. This way, the server will know which partial to load when the route is called, and will load the proper translations.

### public

Put inside the public folder any static file you might want to serve from a route that does't depend on any SSR. For example, a favicon.ico file, a 404 page, robots.txt file...

## Getting Started

First, install the project dependencies:

Use node #v20.11.1# to avoid any issues with the dependencies.

```bash
npm install
```

## Building the Project

```bash
npm run build:all
npm run build:bundle
npm run build:images
```

These commands will compile the .scss and .js files, and optimize the images. All will be placed in the dist folder. all does bundle+images.

The .scss contains TailwindCSS utility classes, and when building, it will scan the ejs files to compile only the necessary classes.

## Watching for Changes

```bash
npm run watch
```

This will watch for changes in the .scss and .js files.

## Starting the Server with PM2

After building your application, you can use PM2 to start your server. PM2 is a process manager for Node.js that allows you to keep your server running in the background and automatically restart it if it crashes.

Here's how you can install PM2 globally on your system:

```bash
npm install -g pm2
```

Once PM2 is installed, you can start your server with the production environment with the following command:

```bash
npm run prod-start
```

To start as the development environment:

```bash
npm run dev-start
```

To watch for changes. This will just watch .scss and .js. The rest of the contents, .ejs, locales... are run and rendered by the server, no build neccessary after changes:

```bash
npm run watch
```

To stop and remove all pm2 processes:

```bash
npm run delete-all
```

To remove all pm2 processes and start a new one as production:

```bash
npm run delete-restart
```

## PM2 MANUAL COMMANDS

This command will start your server and display a table with information about the running process. The table includes the process ID, which you can use to manage the process with PM2.

If you make changes to your server.js file, you need to restart your server for those changes to take effect. You can do this with the pm2 restart command:

```bash
pm2 restart app.js
```

To stop your server, you can use the pm2 stop command:

```bash
pm2 stop app.js
```

And to remove your server from PM2's process list, you can use the pm2 delete command:

```bash
pm2 delete app.js
```

## Creating the PM2 process

To create a PM2 process in the server (local, development or production server), execute the following command:

```bash
pm2 start app.js npm --name "PROCESS_NAME" -- run start
```

Then you can use the normal start, stop, restart, delete, watch... commands for that process. You can use the name or the id.

```bash
pm2 start 0
pm2 start PROCESS_NAME
```

To list all the processes:

```bash
pm2 list
```

To open the logs:

```bash
pm2 logs
```

To open the monitoring utility:

```bash
pm2 monit
```
