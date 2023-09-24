const Course = require('../../models/courseModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params?.courseId;
    const course = await Course.findOneAndDelete(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    await User.updateMany({ courses: courseId }, { $pull: { courses: courseId } });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = deleteCourse;
