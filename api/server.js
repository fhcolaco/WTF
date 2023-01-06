const express = require("express");
const crypt = require("crypto");
const app = express();
const mongoose = require("mongoose");
app.use(cors);
app.use(express.json());
const port = process.env.PORT || 8080;
const url =
  "mongodb://admin:admin0@ac-b0t5xsy-shard-00-00.ytechif.mongodb.net:27017,ac-b0t5xsy-shard-00-01.ytechif.mongodb.net:27017,ac-b0t5xsy-shard-00-02.ytechif.mongodb.net:27017/?ssl=true&replicaSet=atlas-8jpz7d-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbname = "WTFserver";
const connect = mongoose.connect(url, {
  dbName: dbname,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect
  .then(() => {
    console.log("WTF!!!!!");
    app.use("/pratos", menu_do_dia);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((erro) => console.log("Erro: " + erro));
