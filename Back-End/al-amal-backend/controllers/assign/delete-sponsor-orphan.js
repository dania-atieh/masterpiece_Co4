const Orphan = require('../../models/orphanModel');
const User = require('../../models/userModel');
const Bill = require('../../models/billModel');
const errorController = require('../../utils/errorController');

const deleteSponsorOrphan = async (req, res) => {
  try {
    const { orphanId } = req.body;

    const orphan = await Orphan.findById(orphanId);

    if (!orphan) {
      throw new Error('orphan_not_found');
    }

    const user = await User.findById(orphan.id_user);

    if (!user) {
      throw new Error('user_not_found');
    }

    //filter --> new array contains elements that passed the test
    // simple string comparisons
    user.orphans = user.orphans.filter((id) => String(id) !== String(orphan._id)); //user.orphans = new array
    user.bills = user.bills.filter((id) => !orphan.bills.includes(String(id))); //not (!) didn't pass the test
    orphan.bills = [] // set the  orphan bills to emty since we removed it from user
    orphan.id_user = undefined;//removing the association between the orphan and any user.

    await user.save();
    await Bill.deleteMany({
      id_orphan: orphan._id //since only one user is sponsoring one orphan
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
