const Bill = require('../../../models/billModel');
const Orphan = require('../../../models/orphanModel');
const Family = require('../../../models/familyModel');
const User = require('../../../models/userModel');

const errorController = require('../../../utils/errorController');

const deleteBill = async (req, res) => {
  try {
    const billId = req.params?.billId;
    const bill = await Bill.findById(billId);
    if (!bill) {
      throw new Error('bill_not_found');
    }
    const user = await User.findById(bill.id_user);
    const orphan = await Orphan.findById(bill.id_orphan);
    const family = await Family.findById(bill.id_family);

    user.bills = user.bills.filter((id) => String(id) !== String(bill._id));

    if (orphan) {
      if (orphan.bills.length === 1) {
        user.orphans = user.orphans.filter((id) => String(id) !== String(bill.id_orphan));
      }
      orphan.bills = orphan.bills.filter((id) => String(id) !== String(bill._id));
      if (orphan.bills.length === 0) {
        orphan.id_user = undefined;
      }
      await orphan.save();
    }
    if (family) {
      if (family.bills.length === 1) {
        user.families = user.families.filter((id) => String(id) !== String(bill.id_family));
      }
      family.bills = family.bills.filter((id) => String(id) !== String(bill._id));
      if (family.bills.length === 0) {
        family.id_user = undefined;
      }
      await family.save();
    }

    await user.save();
    await Bill.findByIdAndDelete(billId);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteBill;
