import database from "infra/database";
import { Connection } from "pg";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  // const versionPSG = await database.query("SHOW server_version");

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionResult.rows[0].max_connections;
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int From pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  //const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int From pg_stat_activity WHERE datname = 'local_db';",);
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,

    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
export default status;
