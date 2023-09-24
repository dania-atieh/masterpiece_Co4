const Course = require('../../models/courseModel');
const errorController = require('../../utils/errorController');

const getAllcourses = async (req, res) => {
  try {
    const { role } = req.user;
    let courses;
    if (role === 'user') {
      courses = await Course.find({}).select(
        '_id name coachName courseImageUrl startDate age price period location description'
      );
    } else {
      courses = await Course.find({}).populate({
        path: 'users',
        select: 'name'
      });
    }
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

module.exports = getAllcourses;
