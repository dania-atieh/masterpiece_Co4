const Course = require('../../models/courseModel');
const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');

const addUserToCourse = async (req, res) => {
  try {
    const { courseId, id_user } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('course_not_found');
    }
    // The some() method returns true (and stops) if the function returns true for one of the array elements.

    // The some() method returns false if the function returns false for all of the array elements.
    
    if (course.users.some((id) => String(id) === String(id_user))) {
      throw new Error('user_added');
    }

    const user = await User.findById(id_user);

    if (!user) {
      throw new Error('user_not_found');
    }

    user.courses.push(courseId);
    course.users.push(id_user);

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

module.exports = addUserToCourse;
