const addUserToCourse = require('./add-user-to-course');
const deleteUserFromCourse = require('./delete-user-from-course');
const addSponsorFamily = require('./add-sponsor-family');
const deleteSponsorFamily = require('./delete-sponsor-family');
const addSponsorOrphan = require('./add-sponsor-orphan');
const deleteSponsorOrphan = require('./delete-sponsor-orphan');

module.exports = {
  addSponsorFamily,
  deleteSponsorFamily,
  addSponsorOrphan,
  deleteSponsorOrphan,
  addUserToCourse,
  deleteUserFromCourse
};
