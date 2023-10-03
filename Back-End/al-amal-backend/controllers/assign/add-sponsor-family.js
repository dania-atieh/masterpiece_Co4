const Family = require('../../models/familyModel');
const Bill = require('../../models/billModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

//update family bill user
const addSponsorFamily = async (req, res) => {
  try {
    const { billUrl, description, amount, familyId, id_user } = req.body;

    if (!billUrl || !description || !amount || !familyId || !id_user) {
      throw new Error('fields_missing');
    }

    const user = await User.findById(id_user);

    if (!user) {
      throw new Error('user_not_found');
    }

    const family = await Family.findById(familyId);

    if (!family) {
      throw new Error('family_not_found');
    }

    let isNew = true;
    if (family.id_user) {
      isNew = false;
      if (String(family.id_user) !== String(id_user)) {
        throw new Error('family_associated');
      }
    }

    const newBill = await Bill.create({
      id_user,
      id_family: familyId,
      description,
      date: new Date(),
      payments: amount,
      billFileUrl: billUrl
    });

    user.bills.push(newBill._id);
    isNew && user.families.push(family._id);
    family.bills.push(newBill._id);
    family.id_user = id_user;

    await user.save();
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

module.exports = addSponsorFamily;
