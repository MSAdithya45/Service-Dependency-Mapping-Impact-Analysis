const prisma =
require("../config/prisma");

async function canOwnerChangeLead(
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

        const workspace =
        await prisma.workspaces.findUnique({

            where:{
                id:Number(
                    domain.workspace_id
                )
            }

        });

        if(

            Number(
                workspace.owner_user_id
            ) !== userId

        ){

            return res
            .status(403)
            .json({

                message:
                "Only workspace owner can change domain lead"

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

module.exports = {
    canOwnerChangeLead
};