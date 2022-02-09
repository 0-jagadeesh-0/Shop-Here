const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const uploadRoutes = require("./routes/upload");


dotenv.config();
const app = express();
connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


app.use("/api/upload/", uploadRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/product/", productRoutes);

app.get("/", (req, res) => {
    res.status(200).json("Hello");
})

app.listen(8000, () => {
    console.log("Server Connection Successful.");
})