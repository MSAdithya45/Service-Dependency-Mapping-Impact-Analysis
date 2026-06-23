const prisma =
require("../config/prisma");

async function canDeleteService(
    req,
    res,
    next
){

    try{

        const serviceId =
        Number(req.params.id);

        const userId =
        req.user.userId;

        const service =
        await prisma.services.findUnique({

            where:{
                id:serviceId
            }

        });

        if(!service){

            return res
            .status(404)
            .json({

                message:
                "Service not found"

            });

        }

        const member =
        await prisma.workspace_members
        .findFirst({

            where:{

                domain_id:
                service.domain_id,

                user_id:
                userId,

                role:
                "LEAD"

            }

        });

        if(!member){

            return res
            .status(403)
            .json({

                message:
                "Only domain lead can delete services"

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
    canDeleteService
};