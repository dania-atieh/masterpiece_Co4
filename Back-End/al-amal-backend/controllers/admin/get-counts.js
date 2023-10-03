const User = require('../../models/userModel');
const Family = require('../../models/familyModel');
const Orphan = require('../../models/orphanModel');
const Bill = require('../../models/billModel');
const Course = require('../../models/courseModel');
const errorController = require('../../utils/errorController');

const getCounts = async (req, res) => {
  try {
    const { role } = req.user;
    let adminsCount = null;
    if (role === 'superAdmin') {
      adminsCount = await User.countDocuments({ role: { $in: ['admin', 'superAdmin'] } });
    }

    const usersCount = await User.countDocuments({ role: 'user' });
    const familiesCount = await Family.countDocuments();
    const orphansCount = await Orphan.countDocuments();
    const billsCount = await Bill.countDocuments();
    const coursesCount = await Course.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        users: usersCount,
        admins: adminsCount,
        bills: billsCount,
        families: familiesCount,
        orphans: orphansCount,
        courses: coursesCount
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getCounts;
