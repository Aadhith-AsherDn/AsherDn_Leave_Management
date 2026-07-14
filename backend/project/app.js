const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/configDB");

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());



connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/users",require("./routes/userRoutes"));

app.use("/leave",require("./routes/leaveRoutes"));

app.use("/punch",require("./routes/punchRoutes"));


app.listen(port, () => {
  console.log(`server running ${port}`);
});
