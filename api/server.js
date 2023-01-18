const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const port = process.env.PORT || 4000;
const url =
  "mongodb://admin:admin0@ac-rqve9sw-shard-00-00.igqcjev.mongodb.net:27017,ac-rqve9sw-shard-00-01.igqcjev.mongodb.net:27017,ac-rqve9sw-shard-00-02.igqcjev.mongodb.net:27017/?ssl=true&replicaSet=atlas-75945x-shard-0&authSource=admin&retryWrites=true&w=majority";
const connect = mongoose.connect(url, {
  dbName: "WTFserver",
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect
  .then(() => {
    console.log("WTF!!!!!");
    app.use((req, res, next) => {
      //Authentication middleware goes here (JWT) - to be implemented
      next();
    });
    app.use("/images", express.static("images"));
    app.use("/booking", require("./controllers/booking.js"));
    app.use("/hotel_category", require("./controllers/hotel_category.js"));
    app.use("/hotel", require("./controllers/hotel.js"));
    app.use("/room_category", require("./controllers/room_category.js"));
    app.use("/room", require("./controllers/room.js"));
    app.use(
      "/services_category",
      require("./controllers/services_category.js")
    );
    app.use("/services", require("./controllers/services.js"));
    app.use("/user", require("./controllers/user.js"));
    app.listen(port, () => console.log(`Listening on port ${port}`));
    app.use((req, res) => {
      res.send(
        "Bem vindo ao servidor WTF. Esperemos que a sua estadia seja curta e dispendiosa"
      );
    });
  })
  .catch((erro) => console.log("Erro: " + erro));
