const prisma =
require("../config/prisma");

async function canTransferWorkspaceOwnership(
    req,
    res,
    next
){

    try{

        const workspaceId =
        Number(req.params.id);

        const userId =
        req.user.userId;

        const workspace =
        await prisma.workspaces.findUnique({

            where:{
                id:workspaceId
            }

        });

        if(!workspace){

            return res
            .status(404)
            .json({

                message:
                "Workspace not found"

            });

        }

        if(
            Number(
                workspace.owner_user_id
            ) !== userId
        ){

            return res
            .status(403)
            .json({

                message:
                "Only workspace owner can transfer ownership"

            });

        }

        return next();

    }
    catch(error){

        return res
        .status(500)
        .json({

            message:
            error.message

        });

    }

  }

async function canModifyWorkspace(
    req,
    res,
    next
){

    try{

        const workspaceId =
        Number(req.params.id);

        const userId =
        req.user.userId;

        const workspace =
        await prisma.workspaces.findUnique({

            where:{
                id:workspaceId
            }

        });

        if(!workspace){

            return res
            .status(404)
            .json({

                message:
                "Workspace not found"

            });

        }

        if(
            Number(
                workspace.owner_user_id
            ) === userId
        ){

            return next();

        }

        if(
            workspace.workspace_type ===
            "PERSONAL"
        ){

            return res
            .status(403)
            .json({

                message:
                "Only owner can modify personal workspace"

            });

        }

        const lead =
        await prisma.workspace_members
        .findFirst({

            where:{

                workspace_id:
                workspaceId,

                user_id:
                userId,

                role:
                "LEAD"

            }

        });

        if(lead){

            return next();

        }

        return res
        .status(403)
        .json({

            message:
            "Only workspace owner or domain lead can modify workspace"

        });

    }
    catch(error){

        return res
        .status(500)
        .json({

            message:
            error.message

        });

    }

}


module.exports = {
    canModifyWorkspace,
    canTransferWorkspaceOwnership,
};