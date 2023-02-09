const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");

// Routers
const pageRouter = require("./routers/pagerouter")

const app = express();
const port = 3000;

// TAMPLATE ENGINGE
app.set("view engine", "ejs");

// DB connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/freelancer-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use('/', pageRouter);


app.listen(port, () => {
  console.log(`Sunucu portu : ${port} ...`);
});
