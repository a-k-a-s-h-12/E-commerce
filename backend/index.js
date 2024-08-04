//PACKAGES
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//UTILS
const connectDb = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productsRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const app = express();

dotenv.config(); //load environment variables in "process.env"

connectDb(); // connects the dataBase

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //to use req.cookies

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/order", orderRoutes);

app.use("/uploads", express.static(path.join(path.resolve() + "/uploads")));
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_Id });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express port connected: ${port}...`);
});
