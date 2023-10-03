const Course = require('../../models/courseModel');
const errorController = require('../../utils/errorController');

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params?.courseId;
    const {
      name,
      coachName,
      courseImageUrl,
      startDate,
      age,
      price,
      period,
      location,
      description
    } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        name,
        coachName,
        courseImageUrl,
        startDate,
        age,
        price,
        period,
        location,
        description
      },
      {
        runValidators: true,
        returnOriginal: false
      }
    ).populate({
      path: 'users',
      select: 'name'
    });
    if (!course) {
      throw new Error('course_not_found');
    }
    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = updateCourse;
