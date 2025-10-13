import Sequelize from "sequelize";
import sequelize from "../config/db.config.js";

import UserModel from "./user.model.js";
import ProductModel from "./product.model.js";
import OrderModel from "./order.model.js";
import CartModel from "./cart.model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize);
db.Product = ProductModel(sequelize);
db.Order = OrderModel(sequelize);
db.Cart = CartModel(sequelize);

// Associations
db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasOne(db.Cart, { foreignKey: 'userId' });
db.Cart.belongsTo(db.User, { foreignKey: 'userId' });

// Many-to-Many Cart <-> Product through CartItems
db.CartItems = sequelize.define('CartItems', {
  quantity: { type: Sequelize.DataTypes.INTEGER, defaultValue: 1 }
});
db.Product.belongsToMany(db.Cart, { through: db.CartItems });
db.Cart.belongsToMany(db.Product, { through: db.CartItems });

export default db;