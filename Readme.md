# Project Name

This project uses Gulp to automate the build process. The source files are located in the `src` directory, and the built files are output to the `dist` directory.

## Getting Started

First, install the project dependencies:

```bash
npm install
```

## Building the Project

```bash
npm run build
```

This command runs the compiles the .scss and .js inside src/assets into the dist directory.

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
