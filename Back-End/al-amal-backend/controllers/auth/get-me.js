const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const getMe = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId).populate([
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

    if (!user) {
      throw new Error('user_not_found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        user: user
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getMe;
