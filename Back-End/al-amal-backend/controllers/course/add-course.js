const Course = require('../../models/courseModel');
const errorController = require('../../utils/errorController');

const addCourse = async (req, res) => {
  try {
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

    const course = await Course.create({
      name,
      coachName,
      courseImageUrl,
      startDate,
      age,
      price,
      period,
      location,
      description
    });
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

module.exports = addCourse;
