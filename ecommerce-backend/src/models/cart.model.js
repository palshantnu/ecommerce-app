import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
  });
};