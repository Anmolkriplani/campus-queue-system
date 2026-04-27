const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");

const userRoutes = require("./userRoutes");
const tokenRoutes = require("./tokenRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tokens", tokenRoutes);

/* Static frontend */
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "index.html")
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
