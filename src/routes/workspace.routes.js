const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/auth.middleware");

const workspaceController =
require("../controllers/workspace.controller");


const modifyWorkspaceMiddleware =
require("../middleware/workspace.middleware");

const transferWorkspaceOwnershipMiddleware =
require("../middleware/workspace.middleware");

router.post(
    "/",
    authMiddleware,
    workspaceController.createWorkspace
);


router.get(
    "/all",
    authMiddleware,
    workspaceController.getWorkspaces
);


router.get(
    "/:id/graph",
    authMiddleware,
    workspaceController.getWorkspaceGraph
);


router.post(
    "/:id/impact-report",
    authMiddleware,
    workspaceController.generateImpactReport
);




router.patch(
    "/:id/name",
    authMiddleware,
    modifyWorkspaceMiddleware,
    workspaceController.updateWorkspaceName
);


router.patch(
    "/:id/owner",
    authMiddleware,
    transferWorkspaceOwnershipMiddleware,
    workspaceController.transferWorkspaceOwnership
);




router.delete(
    "/:id",
    authMiddleware,
    modifyWorkspaceMiddleware,
    workspaceController.deleteWorkspace
);


router.patch(
    "/:id/personal-name",
    authMiddleware,
    modifyWorkspaceMiddleware,
    workspaceController.updatePersonalWorkspaceName
);


router.delete(
    "/:id/personal",
    authMiddleware,
    modifyWorkspaceMiddleware,
    workspaceController.deletePersonalWorkspace
);


router.post(
    "/:id/clone",
    authMiddleware,
    workspaceController
    .cloneWorkspaceToPersonal
);




module.exports = router;