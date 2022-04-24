const { MongoClient } = require("mongodb");
require("dotenv/config");

const uri = `mongodb://root:${process.env.DATABASE_PASSWORD}@cluster0-shard-00-00.2yhrr.mongodb.net:27017,cluster0-shard-00-01.2yhrr.mongodb.net:27017,cluster0-shard-00-02.2yhrr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14gwcx-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client