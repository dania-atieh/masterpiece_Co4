const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');
const Orphan = require('../../models/orphanModel');
const Family = require('../../models/familyModel');
const Bill = require('../../models/billModel');

const deleteMe = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (role === 'superAdmin') {
      const users = await User.find({ role });
      if (users.length === 1) {
        throw new Error(
          'You can not delete your Account,There has to be at least one superAdmin in the system.'
        );
      }
    }

    await Orphan.updateMany({ id_user: userId }, { $unset: { id_user: '' } });
    await Family.updateMany({ id_user: userId }, { $unset: { id_user: '' } });
    await Bill.deleteMany({
      id_user: userId
    });

    await User.findByIdAndDelete(userId);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteMe;
