const Bill = require('../../../models/billModel');
const errorController = require('../../../utils/errorController');

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).populate({ path: 'id_user id_orphan id_family', select: 'name' });
    res.status(200).json({
      status: 'success',
      results: bills.length,
      data: {
        bills
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getAllBills;
