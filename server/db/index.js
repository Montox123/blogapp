const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://ankitraj64930:p3rbx2nVkmZ2j4fh@cluster0.xuyw150.mongodb.net/ppt"
  )
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
