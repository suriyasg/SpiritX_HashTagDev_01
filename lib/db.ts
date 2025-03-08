import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
export const  pool = mysql.createPool({
  host: process.env.HOST_DEV,
  user: process.env.USER_DEV,
  database: process.env.DATABASE_DEV,
  password: process.env.PASSWORD_DEV,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as connectionLimit
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});