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



const {
    canDeleteService
} = require(
    "../middleware/service-delete.middleware"
);





router.post(
    "/",
    authenticate,
    canCreateService,
    serviceController.createService
);

router.get(
    "/domain/:domainId",
    authenticate,
    serviceController.getServices
);


router.patch(
    "/:id/name",
    authenticate,
    canModifyService,
    serviceController.updateServiceName
);


router.delete(
    "/:id",
    authenticate,
    canDeleteService,
    serviceController.deleteService
);






module.exports = router;