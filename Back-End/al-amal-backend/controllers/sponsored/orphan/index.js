const Orphan = require('../../../models/orphanModel');
const Bill = require('../../../models/billModel');
const errorController = require('../../../utils/errorController');
const { filterObj } = require('../../../utils/utils');

const createOrphan = async (req, res) => {
  try {
    const { name, socialStudyUrl } = req.body;
    const orphan = await Orphan.create({
      name,
      socialStudyUrl
    });
    res.status(200).json({
      status: 'success',
      data: {
        orphan
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const deleteOrphan = async (req, res) => {
  try {
    const orphanId = req.params?.orphanId;
    const orphan = await Orphan.findByIdAndDelete(orphanId);
    if (!orphan) {
      throw new Error('Orphan not found');
    }
    await Bill.deleteMany({
      id_orphan: orphan._id
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const updateOrphan = async (req, res) => {
  try {
    const orphanId = req.params?.orphanId;
    const filteredBody = filterObj(req.body, 'name', 'socialStudyUrl');
    const updatedOrphan = await Orphan.findByIdAndUpdate(orphanId, filteredBody, {
      runValidators: true,
      returnOriginal: false
    }).populate({ path: 'id_user', select: 'name' });

    if (!updatedOrphan) {
      throw new Error('Orphan not found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        orphan: updatedOrphan
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const getOrphansNotSelected = async (req, res) => {
  try {
    const orphans = await Orphan.find({ id_user: null }).select('name');
    res.status(200).json({
      status: 'success',
      results: orphans.length,
      data: {
        orphans
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

const getAllOrphans = async (req, res) => {
  try {
    const orphans = await Orphan.find({}).populate({ path: 'id_user', select: 'name' });
    res.status(200).json({
      status: 'success',
      results: orphans.length,
      data: {
        orphans
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = {
  createOrphan,
  deleteOrphan,
  updateOrphan,
  getOrphansNotSelected,
  getAllOrphans
};
