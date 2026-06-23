const prisma =
require("../config/prisma");

async function createService(
    data
){

    const {

        domain_id,
        service_name

    } = data;

    if(
        !domain_id ||
        !service_name
    ){

        throw new Error(
            "Domain id and service name are required"
        );

    }

    const domain =
    await prisma.domains.findUnique({

        where:{
            id:Number(domain_id)
        }

    });

    if(!domain){

        throw new Error(
            "Domain not found"
        );

    }

    const existingService =
    await prisma.services.findFirst({

        where:{

            domain_id:
            Number(domain_id),

            service_name:
            service_name

        }

    });

    if(existingService){

        throw new Error(
            "Service already exists in this domain"
        );

    }

    await prisma.services.create({

        data:{

            workspace_id:
            domain.workspace_id,

            domain_id:
            Number(domain_id),

            service_name:
            service_name

        }

    });

    return {

        message:
        "Service created successfully"

    };

}



async function updateServiceName(
    serviceId,
    data
){

    const {
        service_name
    } = data;

    if(!service_name){

        throw new Error(
            "Service name is required"
        );

    }

    const currentService =
    await prisma.services.findUnique({

        where:{
            id:Number(serviceId)
        }

    });

    if(!currentService){

        throw new Error(
            "Service not found"
        );

    }

    const existingService =
    await prisma.services.findFirst({

        where:{

            domain_id:
            currentService.domain_id,

            service_name:
            service_name,

            NOT:{
                id:Number(serviceId)
            }

        }

    });

    if(existingService){

        throw new Error(
            "Service name already exists in this domain"
        );

    }

    await prisma.services.update({

        where:{
            id:Number(serviceId)
        },

        data:{
            service_name
        }

    });

    return {

        message:
        "Service updated successfully"

    };

}




module.exports = {

    createService,
    updateServiceName

};