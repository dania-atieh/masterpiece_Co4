const Orphan = require('../../models/orphanModel');
const Bill = require('../../models/billModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const addSponsorOrphan = async (req, res) => {
  try {
    const { billUrl, description, amount, orphanId, id_user } = req.body;

    if (!billUrl || !description || !amount || !orphanId || !id_user) {
      throw new Error('Some fields are missing!');
    }

    const user = await User.findById(id_user);

    if (!user) {
      throw new Error('User is not exist');
    }

    const orphan = await Orphan.findById(orphanId);

    if (!orphan) {
      throw new Error('Orphan not found');
    }
    let isNew = true;
    if (orphan.id_user) {
      isNew = false;
      if (String(orphan.id_user) !== String(id_user)) {
        throw new Error('Orphan associated with another user');
      }
    }

    const newBill = await Bill.create({
      id_user,
      id_orphan: orphanId,
      description,
      date: new Date(),
      payments: amount,
      billFileUrl: billUrl
    });

    user.bills.push(newBill._id);
    isNew && user.orphans.push(orphan._id);
    orphan.bills.push(newBill._id);
    orphan.id_user = id_user;

    await user.save();
    await orphan.save();

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

module.exports = addSponsorOrphan;
