import knex from 'knex';

let mariadb = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clasecoder'
  },
});

class MariaDb {
  static client;
  constructor() {
    if (MariaDb.client) {
      return MariaDb.client;
    }
    MariaDb.client = mariadb;
    this.client = MariaDb.client;
  }
};

export default new MariaDb();
