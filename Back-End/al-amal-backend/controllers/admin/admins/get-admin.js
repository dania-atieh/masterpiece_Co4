const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');

const getAdmin = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const admin = await User.findOne({
      _id: userId,
      role: { $in: ['admin', 'superAdmin'] }
    });
    if (!admin) {
      throw new Error('Admin not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        admin
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getAdmin;
