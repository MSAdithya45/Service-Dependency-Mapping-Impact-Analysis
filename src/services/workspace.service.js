const prisma =
require("../config/prisma");

async function createWorkspace(
    data,
    userId
){

    const {
        workspace_name,
        workspace_type
    } = data;

    if(
        !workspace_name ||
        !workspace_type
    ){

        throw new Error(
            "Workspace name and type are required"
        );

    }

    if(
        workspace_type !== "TEAM" &&
        workspace_type !== "PERSONAL"
    ){

        throw new Error(
            "Invalid workspace type"
        );

    }

    const existingWorkspace =
    await prisma.workspaces.findFirst({

        where: {

            owner_user_id:
            userId,

            workspace_name:
            workspace_name

        }

    });

    if(existingWorkspace){

        throw new Error(
            "Workspace name already exists. Please choose another workspace name."
        );

    }

    try{

        await prisma.workspaces.create({

            data:{

                workspace_name:
                workspace_name,

                workspace_type:
                workspace_type,

                owner_user_id:
                userId

            }

        });

    }
    catch(error){

        if(error.code === "P2002"){

            throw new Error(
                "Workspace name already exists. Please choose another workspace name."
            );

        }

        throw error;

    }

    return {

        message:
        "Workspace created successfully"

    };

}

module.exports = {
    createWorkspace
};