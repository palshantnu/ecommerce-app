import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Pending" },
    address: { type: DataTypes.TEXT }
  });
};