const prisma =
require("../config/prisma");

async function allowOwnerOrLead(
    req,
    res,
    next
){

    try{

        const workspaceId =
        Number(
            req.body.workspace_id
        );

        const userId =
        req.user.userId;

        const member =
        await prisma.workspace_members
        .findFirst({

            where:{

                workspace_id:
                workspaceId,

                user_id:
                userId,

                role:"LEAD"

            }

        });

        if(member){

            return next();

        }

        const workspace =
        await prisma.workspaces
        .findUnique({

            where:{
                id:workspaceId
            }

        });

        if(
            workspace &&
            Number(
                workspace.owner_user_id
            ) === userId
        ){

            return next();

        }

        return res
        .status(403)
        .json({

            message:
            "Only workspace owner or lead can create domains"

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





async function canModifyDomain(
    req,
    res,
    next
){

    try{

        const domainId =
        Number(req.params.id);

        const userId =
        req.user.userId;

        const domain =
        await prisma.domains.findUnique({

            where:{
                id:domainId
            }

        });

        if(!domain){

            return res
            .status(404)
            .json({

                message:
                "Domain not found"

            });

        }

        const member =
        await prisma.workspace_members
        .findFirst({

            where:{

                workspace_id:
                domain.workspace_id,

                domain_id:
                domainId,

                user_id:
                userId,

                role:
                "LEAD"

            }

        });

        if(member){

            return next();

        }

        const workspace =
        await prisma.workspaces
        .findUnique({

            where:{
                id:domain.workspace_id
            }

        });

        if(
            workspace &&
            Number(
                workspace.owner_user_id
            ) === userId
        ){

            return next();

        }

        return res
        .status(403)
        .json({

            message:
            "Only workspace owner or domain lead can modify this domain"

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
    allowOwnerOrLead,
    canModifyDomain
};