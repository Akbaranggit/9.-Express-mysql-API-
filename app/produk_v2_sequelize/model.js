const sequelize = require("../../config/sequelize_mysql2");
const { Sequelize, DataTypes } = require("sequelize");

const produk = sequelize.define(
  "Produk",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = produk;
