const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../iCreateVideoUi-05/build");

//dotenv config
dotenv.config();

//Mongodb connection
connectDB();

//Rest object...
const app = express();
app.use(express.static(buildpath));

//Middlewares...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("videos"));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://192.168.1.3:3000");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//routes...
//const route2 = require('./combo/videoController');
const route2 = require("./routes/videoRoute");
const route1 = require("./routes/imageRoute");
const route3 = require("./routes/userRoute");
const route4 = require("./routes/createCard");
const route5 = require("./routes/adminRoute");
app.use("/api/auth", route2);
app.use("/api/auth", route1);
app.use("/api/auth", route3);
app.use("/api/auth", route4);
app.use("/api/auth", route5);

//Test purpose...
app.get("*", (req, res) => {
  // res.send("hellooooo")

  res.sendFile(
    path.join(__dirname, "../iCreateVideoUi-05/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//port...
const port = process.env.PORT || 80;

// Listen port...
const server = app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
