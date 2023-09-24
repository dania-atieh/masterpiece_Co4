const express = require('express');
const courseController = require('../controllers/course');
const authenticator = require('../middleware/authenticator');
const { adminsCheck, usersCheck } = require('../middleware/roleMiddleware');

const router = express.Router();

// All =============== >>

router.get('/get-courses', authenticator, courseController.getAllCourses);

// Admins =============== >>

router.post(
  '/get-courses-not-selected',
  authenticator,
  adminsCheck,
  courseController.getCoursesNotSelected
);
router.post('/add-course', authenticator, adminsCheck, courseController.addCourse);
router.patch('/update-course/:courseId', authenticator, adminsCheck, courseController.updateCourse);
router.delete(
  '/delete-course/:courseId',
  authenticator,
  adminsCheck,
  courseController.deleteCourse
);

// Users =============== >>

router.post('/sup-to-course', authenticator, usersCheck, courseController.supToCourse);

module.exports = router;
