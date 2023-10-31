import { UserModel } from "../Models";
import jwt from "jsonwebtoken";

const AuthController = {
  async registerUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = new UserModel({ username, password });
      await user.save();
      res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      res.status(400).json({ message: "Registration failed" });
    }
  },
  async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      let doCompareUserPassword = await user.comparePassword(
        password,
        (err, isMatch) => {
          if (err || !isMatch) {
            return res
              .status(400)
              .json({ message: "Invalid username or password" });
          }

          const doGenerateUserToken = jwt.sign(
            { id: user._id },
            "NewPrivateKey"
          );
          res
            .status(200)
            .json({ loginUserDetails: user, authToken: doGenerateUserToken });
        }
      );
    } catch (err) {
      res.status(500).json({ message: "Login failed" });
    }
  },
};
export default AuthController;
