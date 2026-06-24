const prisma =
require("../config/prisma");

async function createDependencyService(
    data
){

    const {

        workspace_id,
        source_service_id,
        target_service_id

    } = data;

    if(

        !workspace_id ||
        !source_service_id ||
        !target_service_id

    ){

        throw new Error(
            "Workspace id, source service id and target service id are required"
        );

    }

    if(
        Number(
            source_service_id
        ) ===
        Number(
            target_service_id
        )
    ){

        throw new Error(
            "Source and target services cannot be the same"
        );

    }

    const sourceService =
    await prisma.services.findUnique({

        where:{
            id:Number(
                source_service_id
            )
        }

    });

    const targetService =
    await prisma.services.findUnique({

        where:{
            id:Number(
                target_service_id
            )
        }

    });

    if(
        !sourceService ||
        !targetService
    ){

        throw new Error(
            "Service not found"
        );

    }

    const existingDependency =
    await prisma.dependencies.findFirst({

        where:{

            workspace_id:
            Number(workspace_id),

            source_service_id:
            Number(source_service_id),

            target_service_id:
            Number(target_service_id)

        }

    });

    if(existingDependency){

        throw new Error(
            "Dependency already exists"
        );

    }

    await prisma.dependencies.create({

        data:{

            workspace_id:
            Number(workspace_id),

            source_service_id:
            Number(source_service_id),

            target_service_id:
            Number(target_service_id)

        }

    });

    return {

        message:
        "Dependency created successfully"

    };

}

async function deleteDependency(
    dependencyId
){

    const dependency =
    await prisma.dependencies
    .findUnique({

        where:{
            id:Number(
                dependencyId
            )
        }

    });

    if(!dependency){

        throw new Error(
            "Dependency not found"
        );

    }

    await prisma.dependencies
    .delete({

        where:{
            id:Number(
                dependencyId
            )
        }

    });

    return {

        message:
        "Dependency deleted successfully"

    };

}

module.exports = {
    createDependencyService,
    deleteDependency
};