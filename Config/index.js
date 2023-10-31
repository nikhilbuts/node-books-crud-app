require("dotenv").config({ path: "./config.env" });

export const { MONGO_DB_URL, JWT_SECRET_KEY, APP_PORT, JWT_EXPIRY } =
  process.env;
