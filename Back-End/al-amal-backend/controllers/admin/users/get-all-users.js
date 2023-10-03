const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).populate({
      path: 'orphans families courses',//add name value of these fields(arrays) 
      select: 'name'
    });
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getAllUsers;
