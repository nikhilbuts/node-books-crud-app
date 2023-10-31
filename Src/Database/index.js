import mongoose from "mongoose";
import { MONGO_DB_URL } from "../../Config";
mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Database Connected`);
  })
  .catch((error) => {
    console.log("Error While Connecting Database",error);
  });
