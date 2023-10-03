const User = require('../../../models/userModel');
const Orphan = require('../../../models/orphanModel');
const Family = require('../../../models/familyModel');
const Bill = require('../../../models/billModel');
const Course = require('../../../models/courseModel');

const errorController = require('../../../utils/errorController');

const deleteUser = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const user = await User.findOneAndRemove({ _id: userId, role: 'user' });
    if (!user) {
      throw new Error('user_not_found');
    }
    await Orphan.updateMany({ id_user: userId }, { $unset: { id_user: '' } });
    await Family.updateMany({ id_user: userId }, { $unset: { id_user: '' } });
    await Bill.deleteMany({
      id_user: userId
    });
    await Course.updateMany({ users: userId }, { $pull: { users: userId } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteUser;
