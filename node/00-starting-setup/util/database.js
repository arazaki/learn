const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://arazaki:HEt5VIvk7BU03EIq@cluster0.hf7pa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then(result => {
      console.log("Connected to MongoDB");
      callback(result);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
