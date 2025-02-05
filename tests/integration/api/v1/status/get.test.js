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
