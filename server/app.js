const exp = require("express");
const app = exp();
require("dotenv").config();
//DB
const mongo = require("mongoose");
//logger
const morgan = require("morgan");
//cookies
const cookie = require("cookie-parser");
//cors
const cors = require("cors");

const auth = require("./routes/auth");
const category = require("./routes/categories");
const product = require("./routes/products");
const order = require("./routes/orders");
const users = require("./routes/users");
const customize = require("./routes/customize");
const { loginCheck } = require("./middleware/authenticate");



// Database Connection
mongo.connect("mongodb+srv://<username>:<password>c@cluster0.yys9sob.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log("DB Connected Successfully")
  )
  .catch((err) => console.log("Database not connected..."));

// Middleware
app.use(morgan("dev"));
app.use(cookie());
app.use(cors());
app.use(exp.static("public"));
app.use(exp.urlencoded({ extended: false }));
app.use(exp.json());

// Routes
app.use("/api", auth);
app.use("/api/user", users);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/customize", customize);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server on port:  ", PORT);
});
