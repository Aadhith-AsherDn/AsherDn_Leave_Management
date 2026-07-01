const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/configDB");

const app = express();
const port = process.env.PORT;

app.use(express.json());
connectDB();

app.use("/users",require("./routes/userRoutes"));


app.listen(port, () => {
  console.log(`server running ${port}`);
});
