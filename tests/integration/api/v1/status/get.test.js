//const { default: database } = require("/infra/database");
//const { version } = require("react");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database).not.toHaveProperty("password");
  expect(responseBody.dependencies.database).not.toHaveProperty("email");
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
