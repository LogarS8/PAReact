import {createPool} from 'mysql2/promise';
import {
  MYSQLDATABASE,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLHOST,
  MYSQLPORT,
} from '../config.js';

export const pool = createPool({
  host: MYSQLHOST,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  port: MYSQLPORT,
  connectionLimit: 10,
});

