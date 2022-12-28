const express = require("express");
const crypt = require("crypto");
const app = express();
const mongoose = require("mongoose");
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
    /*app.use("/pratos", async (req, res, next) => {
      //verify authentication
      const login = req.header("Authorization").split(" ")[1];
      const plain = Buffer.from(login, "base64").toString("utf8");
      console.log(plain);
      const passCL = crypt
        .createHash("sha256")
        .update(plain.split(":")[1])
        .digest("hex");
      console.log(await users.find());
      const userDB = await users.findOne({ user: plain.split(":")[0] });
      if (userDB == null)
        res.status(401).send("ERRO USER: " + req.header("Authorization"));
      else if (userDB.pass == passCL) next();
      else res.status(401).send("ERRO PASS: " + req.header("Authorization"));
    });
    app.use("/pratos", menu_do_dia);*/
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((erro) => console.log("Erro: " + erro));
