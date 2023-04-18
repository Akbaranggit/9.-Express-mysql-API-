const router = require("express").Router();
const multer = require("multer");
const upload = multer({
  dest: "uploads",
});
const controlerProduk = require("./controler");

router.get("/produk", controlerProduk.produk);
router.get("/produk/:id", controlerProduk.produkId);
router.post("/produk/", upload.single("image"), controlerProduk.store);
router.put("/produk/:id", upload.single("image"), controlerProduk.update);
router.delete("/produk/:id", upload.single("image"), controlerProduk.hapus);

module.exports = router;
