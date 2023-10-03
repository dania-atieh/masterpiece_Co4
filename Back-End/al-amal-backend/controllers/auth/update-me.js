const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');
const { filterObj, createSendToken } = require('../../utils/utils');

const updateMe = async (req, res) => {
  try {
    const { userId } = req.user;
    const filteredBody = filterObj(req.body, 'name', 'email', 'phoneNumber', 'gender');
    const updatedUser = await User.findByIdAndUpdate(userId, filteredBody, {
      runValidators: true,
      returnOriginal: false
    }).populate([
      {
        path: 'orphans families',
        populate: {
          path: 'bills'
        }
      },
      {
        path: 'courses',
        select: 'name'
      }
    ]);

    createSendToken(updatedUser, 200, res);
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = updateMe;
