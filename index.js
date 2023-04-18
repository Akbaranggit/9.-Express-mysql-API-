const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const logger = require("morgan");
const produkRuterV1 = require("./app/produk/router");
const produkRuterV2Sequelize = require("./app/produk_v2_sequelize/router");

app.use(logger("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use("/publik", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", produkRuterV1);
app.use("/api/v2", produkRuterV2Sequelize);
app.use((req, res) => {
  res.send({
    status: "Gagal",
    message: "Resourses http://localhost:3100" + req.originalUrl + " tidak ada",
  });
});

app.listen(3100, () => console.log("Server: http://localhost:3100"));
