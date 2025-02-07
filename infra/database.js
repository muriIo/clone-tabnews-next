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

  try {
    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

async function getVersion() {
  const { rows } = await query("SHOW server_version;");

  const version = rows[0].server_version;

  return version;
}

async function getMaxConnections() {
  const { rows } = await query("SHOW max_connections;");

  const maxConnections = parseInt(rows[0].max_connections);

  return maxConnections;
}

async function getOpenedConnections() {
  const postgresDb = process.env.POSTGRES_DB;
  const { rows } = await query({
    text: "SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = ($1);",
    values: [postgresDb],
  });

  const openedConnections = rows[0].opened_connections;

  return openedConnections;
}

export default {
  query,
  getMaxConnections,
  getOpenedConnections,
  getVersion,
};
