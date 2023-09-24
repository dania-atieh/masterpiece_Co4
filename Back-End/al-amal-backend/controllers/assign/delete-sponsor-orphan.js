const Orphan = require('../../models/orphanModel');
const User = require('../../models/userModel');
const Bill = require('../../models/billModel');
const errorController = require('../../utils/errorController');

const deleteSponsorOrphan = async (req, res) => {
  try {
    const { orphanId } = req.body;

    const orphan = await Orphan.findById(orphanId);

    if (!orphan) {
      throw new Error('Orphan not found');
    }

    const user = await User.findById(orphan.id_user);

    if (!user) {
      throw new Error('User not found');
    }

    user.orphans = user.orphans.filter((id) => String(id) !== String(orphan._id));
    user.bills = user.bills.filter((id) => !orphan.bills.includes(String(id)));
    orphan.id_user = undefined;

    await user.save();
    await Bill.deleteMany({
      id_orphan: orphan._id
    });
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

module.exports = deleteSponsorOrphan;
