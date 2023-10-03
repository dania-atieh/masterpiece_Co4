const Family = require('../../models/familyModel');
const User = require('../../models/userModel');
const Bill = require('../../models/billModel');
const errorController = require('../../utils/errorController');

const deleteSponsorFamily = async (req, res) => {
  try {
    const { familyId } = req.body;

    const family = await Family.findById(familyId);

    if (!family) {
      throw new Error('family_not_found');
    }

    const user = await User.findById(family.id_user);

    if (!user) {
      throw new Error('user_not_found');
    }

    user.families = user.families.filter((id) => String(id) !== String(family._id));
    user.bills = user.bills.filter((id) => !family.bills.includes(String(id)));
    family.bills = []
    family.id_user = undefined;

    await user.save();
    await Bill.deleteMany({
      id_family: family._id
    });
    await family.save();

    const newUser = await User.findById(user._id).populate({
      path: 'orphans families courses',
      select: 'name'
    });

    return res.status(200).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteSponsorFamily;
