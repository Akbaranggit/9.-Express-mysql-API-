const connection = require("../../config/mysql");
const fs = require("fs");
const path = require("path");

const produk = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: "SELECT * FROM produk WHERE nama LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: "SELECt * FROM produk",
    };
  }
  connection.query(exec, _respon(res));
};

const produkId = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM produk WHERE id=?",
      values: [req.params.id],
    },
    _respon(res)
  );
};

const hapus = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM produk WHERE id=?",
      values: [req.params.id],
    },
    _respon(res)
  );
};

const store = (req, res) => {
  const { user_id, nama, price, stok, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: "INSERT INTO produk (user_id, nama, price, stok, status, img_url) VALUES (?, ?, ?, ?, ?, ?)",
        values: [
          parseInt(user_id),
          nama,
          price,
          stok,
          status,
          `http://localhost:3100/publik/${image.originalname}`,
        ],
      },
      _respon(res)
    );
  }
};

const update = (req, res) => {
  const { user_id, nama, price, stok, status } = req.body;
  const image = req.file;
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    sql =
      "UPDATE produk SET user_id=?, nama=?, price=?, stok=?, status=?, img_url=? WHERE id=?";
    values = [
      parseInt(user_id),
      nama,
      price,
      stok,
      status,
      `http://localhost:3100/publik/${image.originalname}`,
      req.params.id,
    ];
  } else {
    sql =
      "UPDATE produk SET user_id=?, nama=?, price=?, stok=?, status=? WHERE id=?";
    values = [parseInt(users_id), nama, price, stok, status, req.params.id];
  }
  connection.query(
    {
      sql,
      values,
    },
    _respon(res)
  );
};

const _respon = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: error,
      });
    } else {
      res.send({
        status: "Succes",
        response: result,
      });
    }
  };
};

module.exports = {
  produk,
  produkId,
  store,
  update,
  hapus,
};
