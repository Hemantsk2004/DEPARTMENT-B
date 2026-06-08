const mongoose = require("mongoose");

const uri =
  "mongodb+srv://CampusLinkX:Hemantsingh184692@campuslink.x2eqk41.mongodb.net/";

mongoose
  .connect(uri)
  .then(() => {
    console.log("CONNECTED SUCCESSFULLY");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR:");
    console.error(err);
    process.exit(1);
  });