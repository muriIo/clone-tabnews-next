import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const version = await database.getVersion();
  const maxConnections = await database.getMaxConnections();
  const openedConnections = await database.getOpenedConnections();

  console.log(maxConnections, openedConnections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
      webserver: {},
    },
  });
}

export default status;
