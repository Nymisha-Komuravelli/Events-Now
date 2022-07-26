const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { response } = require("express");

//configure CORS
app.use(cors());

//configure express to receive form data
app.use(express.json());

//configure dotenv
dotenv.config({ path: "./.env" });

// const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;

//configure mongodb
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL)
  .then((response) => {
    console.log(`Connected to Mongodb successfully!!`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

/* app.get("/", (req, res) => {
  res.send("Hello");
}); */

//router configuration
app.use("/api/users", require("./router/userRouter"));
app.use("/api/events", require("./router/eventsRouter"));

if(process.env.NODE_ENV === "production"){
  const path = require("path");
  app.use(express.static(path.join(__dirname , 'client' , 'build')));
  app.get('/', (request,response) => {
      response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
  });
}

app.listen(port, () => {
 console.log(`Server started at port ${port}`);
});
