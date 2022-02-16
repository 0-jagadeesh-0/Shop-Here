const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const uploadRoutes = require("./routes/upload");
const cartRoutes = require("./routes/cart");


dotenv.config();
const app = express();
connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "*"
}));


app.use("/api/image/", uploadRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/product/", productRoutes);
app.use("/api/cart/", cartRoutes);

app.get("/", (req, res) => {
    res.status(200).json("Hello");
})

app.listen(8000, () => {
    console.log("Server Connection Successful.");
})