const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { createSendToken } = require('../../../utils/utils');

const signup = async (req, res) => {
  try {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const role = 'superAdmin';
    const secretWord = req.body?.secret;

    if (secretWord === process.env.JWT_SECRET) {
      const newUser = await User.create({
        name,
        email,
        password,
        role
      });
      createSendToken(newUser, 201, res);
      return;
    } else {
      throw new Error('You are not authorized to create an admin account');
    }
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = signup;
