const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');

const updateAdmin = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const filteredBody = filterObj(req.body, 'name', 'email', 'role');
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, role: { $in: ['admin'] } },
      filteredBody,
      {
        runValidators: true,
        returnOriginal: false
      }
    );
    if (!updatedUser) {
      throw new Error('Admin not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = updateAdmin;
