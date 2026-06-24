const express =
require("express");

const router =
express.Router();

const authenticate =
require("../middleware/auth.middleware");

const {
    canManageDependency
} = require(
    "../middleware/dependency.middleware"
);

const dependencyController =
require(
    "../controllers/dependency.controller"
);

router.post(
    "/",
    authenticate,
    canManageDependency,
    dependencyController.createDependency
);

router.delete(
    "/:id",
    authenticate,
    canManageDependency,
    dependencyController.deleteDependency
);

module.exports = router;