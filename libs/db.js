// connection.js
const mysql = require("mysql2/promise");
const { URL } = require("url");

// Connection URI provided
const connectionString =
  "mysql://root:zmCoPDKKGmVeqCXaYAmGjQbVJxtmjviC@roundhouse.proxy.rlwy.net:38780/railway";

// Parse the connection URI
const connectionUrl = new URL(connectionString);

// Extract connection details
const host = connectionUrl.hostname;
const user = connectionUrl.username;
const password = connectionUrl.password;
const database = connectionUrl.pathname.split("/")[1];
const port = connectionUrl.port;

// Create a MySQL connection pool
const db = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
