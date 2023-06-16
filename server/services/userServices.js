import { User } from "../models/index.js";

async function register({ username, password }) {
  try {
    const [_, created] = await User.findOrCreate({
      where: { username },
      defaults: { password },
    });
    return created
      ? { body: "", statusCode: 204 }
      : { body: "This user has already been created", statusCode: 404 };
  } catch (e) {
    console.error(e);
    return { body: "Internal Error", error: true, statusCode: 500 };
  }
}
async function find({ username }) {
  try {
    const user = await User.findOne({ where: { username } });
    return user
      ? { body: user.username, statusCode: 200 }
      : { body: "User not finded", statusCode: 404 };
  } catch (e) {
    console.error(e);
    return { body: "Internal Error", error: true, statusCode: 500 };
  }
}

async function edit({ toUpdate, toMatch }) {
  try {
    const user = await User.findOne({ where: { username: toMatch.username } });
    if (!user) return { body: "User not finded", statusCode: 404 };
    if (await user.validatePassword(toMatch.password))
      await user.update(toUpdate);
    else return { body: "Incorrect passwowrd", statusCode: 401 };
    return { body: "", statusCode: 200 };
  } catch (e) {
    console.error(e);
    return { body: "Internal Error", error: true, statusCode: 500 };
  }
}

async function login({ username, password }) {
  try {
    const user = await User.findOne({ where: { username: username } });
    switch (!!user) {
      case true:
        return (await user.validatePassword(password))
          ? { body: "", statusCode: 201 }
          : { body: "Incorrect password", statusCode: 401 };
      case false:
        return { body: "User not finded", statusCode: 404 };
      default:
        break;
    }
  } catch (e) {
    console.error(e);
    return { body: "Internal Error", error: true, statusCode: 500 };
  }
}

export default { register, find, edit, login };
