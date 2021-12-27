const db_obj = require("./db/sqlite3");
const db = db_obj.client;

class ChatHandler {
  constructor(tabla) {
    this.table = tabla;
    this.existTable();
  }

  async existTable() {
    try {
      let exist = await db.schema.hasTable(this.table).then(data => {
        if (!data) this.createTable()
      });
      return exist;
    } catch (error) {
      console.log(error);
    }
  };

  async createTable() {
    try {
      await db.schema.createTable(this.table, table => {
        table.increments("id").primary
        table.string("email")
        table.timestamp("date");
        table.string("message")
      });
    } catch (error) {
      console.log(error)
    }
  };

  async addChatMsg({ email, date, msg }) {
    try {
      let response = await db.from(this.table).insert({ email, date, message: msg });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async getMessages() {
    try {
      let response = await db.from(this.table)
      return response;
    } catch (error) {
      console.log(error)
    }
  };
};

module.exports = ChatHandler;
