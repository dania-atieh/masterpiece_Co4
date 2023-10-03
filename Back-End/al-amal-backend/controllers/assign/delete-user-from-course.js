const Course = require('../../models/courseModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const removeUserFromCourse = async (req, res) => {
  try {
    const { courseId, id_user } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('course_not_found');
    }

    if (!course.users.includes(String(id_user))) {
      throw new Error('user_not_in_course');
    }

    const user = await User.findById(id_user);

    if (!user) {
      throw new Error('user_not_found');
    }

    user.courses = user.courses.filter((id) => String(id) !== String(courseId));
    course.users = course.users.filter((id) => String(id) !== String(id_user));

    await user.save();
    await course.save();

    const newUser = await User.findById(user._id).populate({
      path: 'orphans families courses',
      select: 'name'
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = removeUserFromCourse;
