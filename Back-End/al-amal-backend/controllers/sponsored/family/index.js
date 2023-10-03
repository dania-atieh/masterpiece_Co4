const Family = require('../../../models/familyModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');
const Bill = require('../../../models/billModel');

const createFamily = async (req, res) => {
  try {
    const { name, socialStudyUrl } = req.body;
    const family = await Family.create({
      name,
      socialStudyUrl
    });
    res.status(200).json({
      status: 'success',
      data: {
        family
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const deleteFamily = async (req, res) => {
  try {
    const familyId = req.params?.familyId;
    const family = await Family.findByIdAndDelete(familyId);
    if (!family) {
      throw new Error('family_not_found');
    }

    await Bill.deleteMany({
      id_family: family._id
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};
const updateFamily = async (req, res) => {
  try {
    const familyId = req.params?.familyId;
    const filteredBody = filterObj(req.body, 'name', 'socialStudyUrl');
    const updatedFamily = await Family.findByIdAndUpdate(familyId, filteredBody, {
      runValidators: true,
      returnOriginal: false
    }).populate({ path: 'id_user', select: 'name' });

    if (!updatedFamily) {
      throw new Error('family_not_found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        family: updatedFamily
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const getFamiliesNotSelected = async (req, res) => {
  try {
    const families = await Family.find({ id_user: null }).select('name');
    res.status(200).json({
      status: 'success',
      results: families.length,
      data: {
        families
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const getAllFamilys = async (req, res) => {
  try {
    const families = await Family.find({}).populate({ path: 'id_user', select: 'name' });
    res.status(200).json({
      status: 'success',
      results: families.length,
      data: {
        families
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = {
  createFamily,
  deleteFamily,
  updateFamily,
  getFamiliesNotSelected,
  getAllFamilys
};
