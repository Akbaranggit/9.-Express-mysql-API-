const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const produkV2controler = require("./controler");

router.get("/produk", produkV2controler.produks);
router.get("/produk/:id", produkV2controler.produksId);
router.post("/produk", upload.single("image"), produkV2controler.buatproduks);
router.delete("/produk/:id", upload.single("image"), produkV2controler.hapus);
router.put("/produk/:id", upload.single("image"), produkV2controler.update);

module.exports = router;
