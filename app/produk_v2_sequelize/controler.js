const produk = require("./model");
const fs = require("fs");
const path = require("path");

//Create
const buatproduks = async (req, res) => {
  const { user_id, nama, harga, stok, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await produk.sync();
      const result = await produk.create({
        user_id,
        nama,
        harga,
        stok,
        status,
        img_url: `http://localhost:3100/publik/${image.originalname}`,
      });
      res.status(200).json({ result });
    } catch (e) {
      console.log(e);
    }
  }
};
// Read
const produks = async (req, res) => {
  try {
    await produk.sync();
    const result = await produk.findAll();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

// read berdasarkan id
const produksId = async (req, res) => {
  try {
    await produk.sync();
    const result = await produk.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

//delete
const hapus = async (req, res) => {
  try {
    await produk.sync();
    const result = await produk.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(hasil);
  } catch (err) {
    res.send(err);
  }
};

// Update
const update = async (req, res) => {
  const { user_id, nama, harga, stok, status } = req.body;
  const id = req.params.id;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await produk.sync();
      const result = await produk.update(
        {
          user_id: user_id,
          nama: nama,
          harga: harga,
          stok: stok,
          status: status,
          img_url: `http://localhost:3100/publik/${image.originalname}`,
        },
        { where: { id } }
      );
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  } else {
    try {
      await produk.sync();
      const result = await produk.update(
        {
          user_id: user_id,
          nama: nama,
          harga: harga,
          stok: stok,
          status: status,
        },
        { where: { id } }
      );
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

module.exports = {
  buatproduks,
  produks,
  produksId,
  hapus,
  update,
};
