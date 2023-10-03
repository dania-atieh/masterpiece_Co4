const Course = require('../../models/courseModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const supToCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user;
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('course_not_found');
    }

    if (course.users.includes(String(userId))) {
      throw new Error('user_added');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('user_not_found');
    }

    user.courses.push(courseId);
    course.users.push(userId);

    await user.save();
    await course.save();

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = supToCourse;
