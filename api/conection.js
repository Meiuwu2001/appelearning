const mysql = require("mysql2/promise");
const { parse } = require("url");

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

const connect = async () => {
  return await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
  });
};

module.exports = connect;
