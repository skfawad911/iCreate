const express = require('express');
const router = express.Router();

const { verifyJwtForClient, handleAdminCreateAccounts, handleAdminLogin, handleSuperAdminCount, handleSuperAdminCreate, handleCreateContentAdmin, handleReportAdminCreate, getAllDetailReport } = require('../controllers/admins');

const { isAuthenticated } = require("../middleware/auth")

router.post('/admin-create-account', handleAdminCreateAccounts)
router.post("/admin-login", handleAdminLogin);



// This is for the client
router.get("/verify-jwt/:token", verifyJwtForClient);

router.post("/create-super-admin", isAuthenticated, handleSuperAdminCount, handleSuperAdminCreate);

router.post("/create-content-admin", isAuthenticated, handleCreateContentAdmin);

router.post("/create-report-admin", isAuthenticated, handleReportAdminCreate);

router.get("/all-detail-report/:id", getAllDetailReport);

module.exports = router