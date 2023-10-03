const express = require('express');
const sponsoredController = require('../controllers/sponsored');
const authenticator = require('../middleware/authenticator');
const { adminsCheck } = require('../middleware/roleMiddleware');

const router = express.Router();

// Orphan =============== >>

router.post('/add-orphan', authenticator, adminsCheck, sponsoredController.orphan.createOrphan);
router.delete(
  '/delete-orphan/:orphanId',
  authenticator,
  adminsCheck,
  sponsoredController.orphan.deleteOrphan
);
router.patch(
  '/update-orphan/:orphanId',
  authenticator,
  adminsCheck,
  sponsoredController.orphan.updateOrphan
);
router.get('/get-orphans', authenticator, adminsCheck, sponsoredController.orphan.getAllOrphans);
router.get(
  '/get-orphans-not-selected',
  authenticator,
  adminsCheck,
  sponsoredController.orphan.getOrphansNotSelected
);

// Family =============== >>

router.post('/add-family', authenticator, adminsCheck, sponsoredController.family.createFamily);
router.delete(
  '/delete-family/:familyId',
  authenticator,
  adminsCheck,
  sponsoredController.family.deleteFamily
);
router.patch(
  '/update-family/:familyId',
  authenticator,
  adminsCheck,
  sponsoredController.family.updateFamily
);
router.get('/get-families', authenticator, adminsCheck, sponsoredController.family.getAllFamilys);
router.get(
  '/get-families-not-selected',
  authenticator,
  adminsCheck,
  sponsoredController.family.getFamiliesNotSelected
);

// Bills =============== >>

router.delete(
  '/delete-bill/:billId',
  authenticator,
  adminsCheck,
  sponsoredController.bill.deleteBill
);
router.patch(
  '/update-bill/:billId',
  authenticator,
  adminsCheck,
  sponsoredController.bill.updateBill
);
router.get('/get-bills', authenticator, adminsCheck, sponsoredController.bill.getAllBills);

module.exports = router;
