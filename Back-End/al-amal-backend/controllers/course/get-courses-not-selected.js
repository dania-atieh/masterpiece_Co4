const Course = require('../../models/courseModel');
const errorController = require('../../utils/errorController');

const getCoursesNotSelected = async (req, res) => {
  try {
    const { id_user } = req.body;

    const courses = await Course.find({ users: { $nin: [id_user] } }).select('name');
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = getCoursesNotSelected;
