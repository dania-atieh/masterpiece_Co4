const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: { $in: ['admin', 'superAdmin'] }
    });
    res.status(200).json({
      status: 'success',
      results: admins.length,
      data: {
        admins
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getAllAdmins;
