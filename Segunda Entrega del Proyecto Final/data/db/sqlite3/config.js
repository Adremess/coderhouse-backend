import knex from 'knex';

let sqlite = knex({
  client: 'sqlite3',
  connection: { filename: './data/db/sqlite3/dbSqlite.sqlite' },
});

class SqliteDb {
  static client;
  constructor() {
    if (SqliteDb.client) {
      return SqliteDb.client;
    }
    SqliteDb.client = sqlite;
    this.client = SqliteDb.client;
  }
};

export default new SqliteDb();
