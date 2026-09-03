const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL
  });
  await client.connect();
  const sql = fs.readFileSync('create_missing_tables.sql', 'utf8');
  await client.query(sql);
  console.log('Tables created!');
  await client.end();
}
main();
