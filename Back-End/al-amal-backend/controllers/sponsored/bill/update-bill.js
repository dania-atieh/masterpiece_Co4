const Bill = require('../../../models/billModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');

const updateBill = async (req, res) => {
  try {
    const billId = req.params?.billId;
    const filteredBody = filterObj(req.body, 'description', 'billUrl', 'amount');
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: billId },
      {
        description: filteredBody.description,
        billFileUrl: filteredBody.billUrl,
        payments: filteredBody.amount
      },
      {
        runValidators: true,
        returnOriginal: false
      }
    ).populate({ path: 'id_user id_orphan id_family', select: 'name' });
    if (!updatedBill) {
      throw new Error('bill_not_found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        bill: updatedBill
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = updateBill;
