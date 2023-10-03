const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');

const addAdmin = async (req, res) => {
  try {
    const filteredBody = filterObj(
      req.body,
      'name',
      'email',
      'password',
      'phoneNumber',
      'gender',
      'role'
    );
    const newUser = await User.create(filteredBody);
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = addAdmin;
