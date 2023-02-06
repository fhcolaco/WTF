const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const isAuth = require("./middleware/auth.js");
app.use(
  cors({
    origin: "*",
  })
);

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
const url = process.env.MONGODB_URI;
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
    app.use("/login", require("./controllers/login.js"));
    app.use("/register", require("./controllers/user.js"));
    app.use("/images", express.static("images"));
    app.use("/booking", require("./controllers/booking.js"));
    app.use("/hotel_category", require("./controllers/hotel_category.js"));
    app.use("/hotel", require("./controllers/hotel.js"));
    app.use("/room_category", require("./controllers/room_category.js"));
    app.use("/room", require("./controllers/room.js"));
    app.use("/services", require("./controllers/services.js"));
    app.use("/user", require("./controllers/user.js"));
    app.use("/verifyUser", require("./controllers/verifyUser.js"));
    app.listen(port, () => console.log(`Listening on port ${port}`));
    app.use((req, res) => {
      res.send(
        "Bem vindo ao servidor WTF. Esperemos que a sua estadia seja curta e dispendiosa"
      );
    });
  })
  .catch((erro) => console.log("Erro: " + erro));
