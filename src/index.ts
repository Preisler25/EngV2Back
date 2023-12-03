// src/index.ts
import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'db', // This is the name of the PostgreSQL service defined in the docker-compose.yml
  database: 'postgres',
  password: 'password',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT $1::text as message', ['Hello World']);
    res.json({ message: rows[0].message });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
