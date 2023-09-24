const getAllCourses = require('./get-all-courses');
const addCourse = require('./add-course');
const updateCourse = require('./update-course');
const deleteCourse = require('./delete-course');
const supToCourse = require('./sup-to-course');
const getCoursesNotSelected = require('./get-courses-not-selected');

module.exports = {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  supToCourse,
  getCoursesNotSelected
};
