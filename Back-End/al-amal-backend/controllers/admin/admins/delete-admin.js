const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');

const deleteAdmin = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const user = await User.findOneAndDelete({ _id: userId, role: { $in: ['admin'] } });
    if (!user) {
      throw new Error('Admin not found');
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteAdmin;
