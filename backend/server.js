const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require("./utils/config/db/db.config");
const cors = require('cors');

const signup = require("./routes/authRoutes/signUpRoute");
const login = require("./routes/authRoutes/logInRoute");


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth/signup", signup);
app.use("/auth/login", login);


app.get("/", async (req, resp) => {
resp.send("app is working fine");
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});