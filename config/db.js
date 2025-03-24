//Filename: config/db.js

import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

//create a connectipn to the database
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

