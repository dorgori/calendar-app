const express = require("express");
const cors = require("cors");
const events = require("./routes/events");
const dbConnect = require("./utils/dbUtil");

const app = express();

const port = process.env.PORT || 4000;

dbConnect()
  .then((res) => {
    if (res) {
      app.use(cors({ origin: true, credentials: true }));
      app.use(express.json());
      app.use("/api/events", events);

      app.get("/", (req, res) => {
        res.send("Hello from calendar backend");
      });

      app.listen(4000, () => {
        console.log(`Calendar backend listening on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.log("Error in conncetion", err);
  });
