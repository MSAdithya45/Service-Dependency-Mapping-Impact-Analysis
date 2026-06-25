const prisma =
require("../config/prisma");

async function createDomain(
    data,
    userId
){

    const {
        workspace_id,
        domain_name
    } = data;

    if(
        !workspace_id ||
        !domain_name
    ){

        throw new Error(
            "Workspace id and domain name are required"
        );

    }

    const existingDomain =
    await prisma.domains.findFirst({

        where:{

            workspace_id:
            workspace_id,

            domain_name:
            domain_name

        }

    });

    if(existingDomain){

        throw new Error(
            "Domain already exists in this workspace"
        );

    }

    const domain =
    await prisma.domains.create({

        data:{

            workspace_id:
            workspace_id,

            domain_name:
            domain_name,

            lead_user_id:
            userId

        }

    });

    await prisma.workspace_members.create({

        data:{

            workspace_id:
            workspace_id,

            domain_id:
            domain.id,

            user_id:
            userId,

            role:
            "LEAD"

        }

    });

    return {

        message:
        "Domain created successfully"

    };

}

async function transferDomainLead(
    domainId,
    data
){

    const {
        new_lead_user_id
    } = data;

    if(
        !new_lead_user_id
    ){

        throw new Error(
            "New lead user id is required"
        );

    }

    const domain =
    await prisma.domains.findUnique({

        where:{
            id:Number(domainId)
        }

    });

    if(!domain){

        throw new Error(
            "Domain not found"
        );

    }

    const user =
    await prisma.users.findUnique({

        where:{
            id:new_lead_user_id
        }

    });

    if(!user){

        throw new Error(
            "User not found"
        );

    }

    const member =
    await prisma.workspace_members
    .findFirst({

        where:{

            workspace_id:
            domain.workspace_id,

            user_id:
            new_lead_user_id

        }

    });

    if(!member){

        throw new Error(
            "User is not a member of this workspace"
        );

    }

    await prisma.$transaction(

        async(tx)=>{

            await tx.workspace_members
            .updateMany({

                where:{

                    domain_id:
                    Number(domainId),

                    role:
                    "LEAD"

                },

                data:{

                    role:
                    "DEVELOPER"

                }

            });

            await tx.workspace_members
            .updateMany({

                where:{

                    domain_id:
                    Number(domainId),

                    user_id:
                    new_lead_user_id

                },

                data:{

                    role:
                    "LEAD"

                }

            });

            await tx.domains
            .update({

                where:{
                    id:Number(domainId)
                },

                data:{

                    lead_user_id:
                    new_lead_user_id

                }

            });

        }

    );

    return {

        message:
        "Domain lead transferred successfully"

    };

}




async function updateDomainName(
    domainId,
    data
){

    const {
        domain_name
    } = data;

    if(!domain_name){

        throw new Error(
            "Domain name is required"
        );

    }

    const currentDomain =
    await prisma.domains.findUnique({

        where:{
            id:Number(domainId)
        }

    });

    if(!currentDomain){

        throw new Error(
            "Domain not found"
        );

    }

    const existingDomain =
    await prisma.domains.findFirst({

        where:{

            workspace_id:
            currentDomain.workspace_id,

            domain_name:
            domain_name,

            NOT:{
                id:Number(domainId)
            }

        }

    });

    if(existingDomain){

        throw new Error(
            "Domain name already exists in this workspace"
        );

    }

    await prisma.domains.update({

        where:{
            id:Number(domainId)
        },

        data:{
            domain_name
        }

    });

    return {

        message:
        "Domain name updated successfully"

    };

}




async function deleteDomain(
    domainId
){

    const domain =
    await prisma.domains.findUnique({

        where:{
            id:Number(domainId)
        }

    });

    if(!domain){

        throw new Error(
            "Domain not found"
        );

    }

    const serviceCount =
    await prisma.services.count({

        where:{

            domain_id:
            Number(domainId)

        }

    });

    if(serviceCount > 0){

        throw new Error(
            "Cannot delete domain. Services exist under this domain."
        );

    }

    await prisma.$transaction(

        async(tx)=>{

            await tx.workspace_members
            .deleteMany({

                where:{

                    domain_id:
                    Number(domainId)

                }

            });

            await tx.domains
            .delete({

                where:{
                    id:Number(domainId)
                }

            });

        }

    );

    return {

        message:
        "Domain deleted successfully"

    };

}

async function getDomains(
    workspaceId
){

    const domains =
    await prisma.domains.findMany({

        where:{

            workspace_id:
            Number(workspaceId)

        },

        select:{

            id:true,

            domain_name:true,

            lead_user_id:true

        },

        orderBy:{

            domain_name:
            "asc"

        }

    });

    return domains;

}



        
async function changeDomainLead(
    domainId,
    data
){

    const {

        new_lead_user_id,
        keep_old_lead_as_developer

    } = data;

    if(

        !new_lead_user_id

    ){

        throw new Error(
            "New lead user id is required"
        );

    }

    const domain =
    await prisma.domains.findUnique({

        where:{
            id:Number(domainId)
        }

    });

    if(!domain){

        throw new Error(
            "Domain not found"
        );

    }

    const currentLeadId =
    Number(
        domain.lead_user_id
    );

    if(

        currentLeadId ===
        Number(new_lead_user_id)

    ){

        throw new Error(
            "User is already the domain lead"
        );

    }

    const member =
    await prisma.workspace_members
    .findFirst({

        where:{

            workspace_id:
            Number(
                domain.workspace_id
            ),

            domain_id:
            Number(domainId),

            user_id:
            Number(
                new_lead_user_id
            )

        }

    });

    if(!member){

        throw new Error(
            "User does not belong to this domain"
        );

    }

    await prisma.$transaction(

        async(tx)=>{

            //--------------------------------
            // NEW LEAD
            //--------------------------------

            await tx.workspace_members
            .update({

                where:{

                    workspace_id_domain_id_user_id:{

                        workspace_id:
                        Number(
                            domain.workspace_id
                        ),

                        domain_id:
                        Number(domainId),

                        user_id:
                        Number(
                            new_lead_user_id
                        )

                    }

                },

                data:{

                    role:
                    "LEAD"

                }

            });

            //--------------------------------
            // OLD LEAD
            //--------------------------------

            if(
                keep_old_lead_as_developer
            ){

                await tx.workspace_members
                .update({

                    where:{

                        workspace_id_domain_id_user_id:{

                            workspace_id:
                            Number(
                                domain.workspace_id
                            ),

                            domain_id:
                            Number(domainId),

                            user_id:
                            currentLeadId

                        }

                    },

                    data:{

                        role:
                        "DEVELOPER"

                    }

                });

            }
            else{

                await tx.workspace_members
                .delete({

                    where:{

                        workspace_id_domain_id_user_id:{

                            workspace_id:
                            Number(
                                domain.workspace_id
                            ),

                            domain_id:
                            Number(domainId),

                            user_id:
                            currentLeadId

                        }

                    }

                });

            }

            //--------------------------------
            // UPDATE DOMAIN TABLE
            //--------------------------------

            await tx.domains.update({

                where:{
                    id:Number(domainId)
                },

                data:{

                    lead_user_id:
                    Number(
                        new_lead_user_id
                    )

                }

            });

        }

    );

    return {

        message:
        "Domain lead updated successfully"

    };

}









module.exports = {

    createDomain,
    transferDomainLead,
    updateDomainName,
    deleteDomain,
    getDomains,
    changeDomainLead

};