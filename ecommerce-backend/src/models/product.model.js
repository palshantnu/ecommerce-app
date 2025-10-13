import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};