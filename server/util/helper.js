const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      resolve(hash);
    } catch (err) {
      reject("Error @authjs:hashPassword ", err);
    }
  });
};

const passwordsMatch = (plainTextPassword, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const match = await bcrypt.compare(plainTextPassword, hash);
      resolve(match);
    } catch (err) {
      reject("Error @authjs:hashPassword ", err);
    }
  });
};

const isValidUsername = (username) => {
  if (username.length == 0) {
    return false;
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return false;
  }

  return true;
};

const isValidPassword = (password) => {
  if (password.length < 5) {
    return false;
  }
  return true;
};

module.exports = { hashPassword, passwordsMatch, isValidUsername, isValidPassword };
