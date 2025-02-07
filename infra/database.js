import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  await client.connect();

  const result = await client.query(queryObject);

  await client.end();

  return result;
}

async function getVersion() {
  const { rows } = await query(
    "SELECT substring(version() FROM 'PostgreSQL (\\d+\\.\\d+)') AS db_version FROM pg_settings WHERE name = 'max_connections'",
  );

  const version = rows[0].db_version;

  return version;
}

async function getMaxConnections() {
  const { rows } = await query(
    "SELECT setting AS max_connections FROM pg_settings WHERE name = 'max_connections'",
  );

  const maxConnections = rows[0].max_connections;

  return maxConnections;
}

async function getOpenedConnections() {
  const { rows } = await query(
    "SELECT (SELECT COUNT(*) FROM pg_stat_activity) AS opened_connections FROM pg_settings WHERE name = 'max_connections'",
  );

  const openedConnections = rows[0].opened_connections;

  return openedConnections;
}

export default {
  query,
  getMaxConnections,
  getOpenedConnections,
  getVersion,
};
