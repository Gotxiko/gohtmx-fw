# GO + HTMX Simple Framework

This project is a learning playground that aims to create a very very simple Go+HTMX framework. Build custom routes with mux, and make use of HTMX for reactivity and requests. The project is built with GO, HTML, CSS and JS, and uses PM2 to keep the server running.

## Folder structure

```text
.
├── dist
│
├── src
│   ├── assets
│   │   ├── css
│   │   ├── img
│   │   └── js
|   |
|   ├── locales
|   |
│   └── views
│       ├── components
│       ├── pages
│       └── partials
│
├── public
|
└── server
    ├── middleware
    ├── routes
    └── functions

```

### dist

dist holds the compiled files. The .css and .js files are bundled into the dist folder. It also holds the images.

### src

src holds the source files. The .css, .js and images are located here.

### locales

locales holds the translations. Each language has its own folder, and inside it, a .json file with all the contents. The .json file holds a key per page/partial. Use the names of the html files for the keys, not the route/slug/name used to access it.

For new pages, add to locales/slugToFileMap.json the routes we want to be accessible to the user. Key is the slug/route, its value is the filename of the HTML to load.

### server

Holds all the files that pertain to the SSR of the site. Developed in Go Lang, using mux for routing.

## Getting Started

First, install the project dependencies:

Use node #v20.11.1# to avoid any issues with the dependencies.

```bash
npm install
```

## Building the Project

```bash
npm run build
```

These commands will bundle the .css and .js files, and copy the images. All will be placed in the dist folder.
The .css contains TailwindCSS, when building, it will automatically scan the project in search of classes.

To build the Go application:

```bash
go build -o gtz-app server/start.go
```

## Watching for Changes

```bash
npm run watch
```

This will watch for changes in the entire project. It uses air to watch for changes and perform an npm run build along with a go application restart. Configuration is in .air.toml

## Prettier

It is very important to format all the documents before committing. Prettier will properly indent the code, and reorder the tailwind classes in the html files.

You can do so with the following command:

```bash
npm run format
```

It is also recommended to enable format on save in your IDE and have it use the config from .prettierrc

## Starting the Server with PM2

After building your application, you can use PM2 to start your server. PM2 is a process manager for Node.js that allows you to keep your server running in the background and automatically restart it if it crashes.

Here's how you can install PM2 globally on your system:

```bash
npm install -g pm2
```

Once PM2 is installed, you can start your server with the production environment with the following command:

```bash
npm run build:start
```

This will build everything the application needs, First, with Parcel, it will build the styles and scripts. Then, it will build the Go application, and thens start a PM2 process named www, which will serve in localhost:3000.

To stop and remove all pm2 processes:

```bash
npm run delete-all
```

## PM2 MANUAL COMMANDS

This command will start your server and display a table with information about the running process. The table includes the process ID, which you can use to manage the process with PM2.

```bash
pm2 start [built_go_filename]
```

IMPORTANT: PM2 CAN ONLY START A BUILT GO APPLICATION. FOR DEVELOPMENT, RUN go run start.go

If you make changes to your .go files, you need to restart your server for those changes to take effect. You can do this with the pm2 restart command:

```bash
pm2 restart [id]
```

To stop your server, you can use the pm2 stop command:

```bash
pm2 stop [id]
```

And to remove your server from PM2's process list, you can use the pm2 delete command:

```bash
pm2 delete [id]
```

## Creating the PM2 process

To create a PM2 process in the server (local, development or production server), execute the following command:

```bash
pm2 start start npm --name "PROCESS_NAME" -- run start
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
