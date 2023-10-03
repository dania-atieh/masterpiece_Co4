const express = require('express');
const assignController = require('../controllers/assign');
const authenticator = require('../middleware/authenticator');
const { adminsCheck } = require('../middleware/roleMiddleware');

// app.use('/api/v1/assign', assignRouter);
const router = express.Router();

// Assign Users =============== >>

router.patch('/add-sponsor-orphan', authenticator, adminsCheck, assignController.addSponsorOrphan);
router.patch('/add-sponsor-family', authenticator, adminsCheck, assignController.addSponsorFamily);
router.patch(
  '/remove-sponsor-orphan',
  authenticator,
  adminsCheck,
  assignController.deleteSponsorOrphan
);
router.patch(
  '/remove-sponsor-family',
  authenticator,
  adminsCheck,
  assignController.deleteSponsorFamily
);

router.patch('/add-user-to-course', authenticator, adminsCheck, assignController.addUserToCourse);
router.patch(
  '/delete-user-from-course',
  authenticator,
  adminsCheck,
  assignController.deleteUserFromCourse
);

module.exports = router;
