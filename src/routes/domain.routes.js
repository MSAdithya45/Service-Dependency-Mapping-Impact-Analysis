const express =
require("express");

const router =
express.Router();

const authenticate =
require("../middleware/auth.middleware");

const {
    allowOwnerOrLead,
    canModifyDomain
} = require(
    "../middleware/domain.middleware"
);

const {
    canTransferDomainLead
} = require(
    "../middleware/domain-transfer.middleware"
);

const domainController =
require(
    "../controllers/domain.controller"
);


const domainOwnerMiddleware =
require("../middleware/domain-owner.middleware");





router.post(
    "/",
    authenticate,
    allowOwnerOrLead,
    domainController.createDomain
);

router.patch(
    "/:id/lead",
    authenticate,
    canTransferDomainLead,
    domainController.transferDomainLead
);

router.patch(
    "/:id/name",
    authenticate,
    canModifyDomain,
    domainController.updateDomainName
);


router.delete(
    "/:id",
    authenticate,
    canModifyDomain,
    domainController.deleteDomain
);


router.get(
    "/:workspaceId",
    authenticate,
    domainController.getDomains
);

router.patch(
    "/:id/lead",
    authenticate,
    domainOwnerMiddleware,
    domainController.changeDomainLead
);



module.exports = router;