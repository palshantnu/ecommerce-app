import dotenv from "dotenv";
import app from "./src/app.js";
import db from "./src/models/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();