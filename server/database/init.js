import mysql from 'mysql';

class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) reject(err);
                console.log('Connected to the MySQL server.');
                resolve();
            });
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) reject(err);
                console.log('Disconnected from the MySQL server.');
                resolve();
            });
        });
    }
}

export default Database;