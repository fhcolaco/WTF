const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors);
app.use(express.json());
const port = process.env.PORT || 4000;
const url =
  "mongodb://admin:admin0@ac-rqve9sw-shard-00-00.igqcjev.mongodb.net:27017,ac-rqve9sw-shard-00-01.igqcjev.mongodb.net:27017,ac-rqve9sw-shard-00-02.igqcjev.mongodb.net:27017/?ssl=true&replicaSet=atlas-75945x-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbname = "WTFServer";
const connect = mongoose.connect(url, {
  dbName: dbname,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect
  .then(() => {
    console.log("WTF!!!!!");
    app.use("/hotel", require("./controllers/hotel.js"));
    // app.use("/hotel_category", require("./controllers/hotel_category.js"));
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((erro) => console.log("Erro: " + erro));
