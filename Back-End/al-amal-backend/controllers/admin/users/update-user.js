const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');

const updateUser = async (req, res) => {
  try {
    const userId = req.params?.userId;

    const filteredBody = filterObj(req.body, 'name', 'email', 'phoneNumber', 'gender');

    const updatedUser = await User.findOneAndUpdate({ _id: userId, role: 'user' }, filteredBody, {
      runValidators: true,
      returnOriginal: false
    }).populate({
      path: 'orphans families courses',
      select: 'name'
    });

    if (!updatedUser) {
      throw new Error('User not found');
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

module.exports = updateUser;
