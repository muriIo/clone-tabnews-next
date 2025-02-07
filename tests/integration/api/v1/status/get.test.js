test("GET -> /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
});

test("GET -> /api/v1/status should return updated_at info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
});

test("GET -> /api/v1/status should return updated_at info in ISO 8601 format", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);
});

test("GET -> /api/v1/status should return dependencies info", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies).toBeDefined();
  expect(responseBody.dependencies.database).toBeDefined();
  expect(responseBody.dependencies.webserver).toBeDefined();
});

test("GET -> /api/v1/status should return database version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const databaseVersion = responseBody.dependencies.database.version;

  expect(databaseVersion).toBeDefined();
});

test("GET -> /api/v1/status should return database max_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const maxConnections = responseBody.dependencies.database.max_connections;

  expect(maxConnections).toBeDefined();

  const parsedMaxConnections = parseInt(maxConnections);

  expect(parsedMaxConnections).not.toBe(NaN);
});

test("GET -> /api/v1/status should return database opened_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const openedConnections =
    responseBody.dependencies.database.opened_connections;

  expect(openedConnections).toBeDefined();

  const parsedOpenedConnections = parseInt(openedConnections);

  expect(parsedOpenedConnections).toEqual(1);
});
