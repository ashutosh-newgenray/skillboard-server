const MongoClient = require("mongodb").MongoClient;

class DbClient {
  constructor() {
    if (!DbClient.instance) {
      let uri =
        "mongodb+srv://dbadmin:Sapient@123@cluster0.pnzi4.mongodb.net/skillboard?retryWrites=true&w=majority";
      this._client = new MongoClient(uri, { useNewUrlParser: true });
      DbClient.instance = this;
    }
    return DbClient.instance;
  }

  disconnect() {
    this._client.close();
    console.log("Successfully closed the connection");
  }

  //rest is the same code as preceding example
}

const instance = new DbClient();
Object.freeze(instance);

module.exports = instance;
