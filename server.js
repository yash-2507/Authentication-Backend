const express = require("express");
const { mongoose } = require("mongoose");
const { connectDB } = require("./config/connectDB");
const cors = require("cors");
const { verifyJwt } = require("./middleware/verifyJWT");

require("dotenv").config();

const app = express();
mongoose.set("strictQuery", true);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
const corsOptions = {
   origin: true,
   credentials: true,
};
app.use(cors(corsOptions));

// Defining Port
const PORT = process.env.PORT || 8080;

// Routes
app.use("/auth", require("./route/auth"));
app.get("/", (req, res) => {
   res.status(200).json({ success: true, message: "Yeah! I'm here..." });
});
app.get("/protected", verifyJwt, (req, res) => {
   res.status(200).json({
      success: true,
      user: req.user,
   });
});

// Connecting to MongoDB and starting Server
mongoose.connection.once("open", () => {
   console.log("Connected to MongoDB");
   app.listen(PORT, () => {
      try {
         console.log(`Server started at PORT ${PORT}`);
      } catch (error) {
         console.log(error.message);
      }
   });
});
