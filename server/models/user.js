import { DataTypes, Model } from "sequelize";
import db from "../config/db/index.js";
import bcrypt from "bcrypt";
class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  async validatePassword(password) {
    const hashedPsswd = await this.hash(password, this.salt);
    return hashedPsswd === this.password;
  }
  async isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return await passwordRegex.test(password);
  }
}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate(async (user) => {
  try {
    if (!(await user.isValidPassword(user.password)))
      throw new Error("Validation password error");
    const salt = bcrypt.genSaltSync();
    user.salt = salt;

    return user.hash(user.password, salt).then((hash) => {
      user.password = hash;
    });
  } catch (e) {
    throw new Error(e);
  }
});
User.beforeUpdate(async (user) => {
  try {
    if (user.changed("password")) {
      if (!(await user.isValidPassword(user.password)))
        throw new Error("Validation password error");
      const salt = bcrypt.genSaltSync();
      user.salt = salt;
      return user.hash(user.password, salt).then((hash) => {
        user.password = hash;
      });
    }
  } catch (e) {
    throw new Error(e);
  }
});

export default User;
