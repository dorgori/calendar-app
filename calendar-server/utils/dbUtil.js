const mongoose = require("mongoose");
const dbConfig = require("../configs/db.config");

const connectToDb = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbConfig.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        directConnection: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
        resolve(true);
      })
      .catch((err) => {
        console.error("Cannot connect to mongoDB", err);
        reject(err);
      });
  });
};

module.exports = connectToDb;
