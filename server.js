const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

/* API Routes */
app.use("/api/users", userRoutes);
app.use("/api/tokens", tokenRoutes);

/* Frontend Static Files */
app.use(express.static(path.join(__dirname, "public")));

/* Home Page */
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

/* Dynamic Port */
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
