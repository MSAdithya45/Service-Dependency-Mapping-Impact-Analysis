const express =
require("express");

const router =
express.Router();

const authenticate =
require("../middleware/auth.middleware");

const {
    canCreateService
} = require(
    "../middleware/service.middleware"
);

const serviceController =
require(
    "../controllers/service.controller"
);

const {
    canModifyService
} = require(
    "../middleware/service-update.middleware"
);



router.post(
    "/",
    authenticate,
    canCreateService,
    serviceController.createService
);

router.patch(
    "/:id/name",
    authenticate,
    canModifyService,
    serviceController.updateServiceName
);

module.exports = router;