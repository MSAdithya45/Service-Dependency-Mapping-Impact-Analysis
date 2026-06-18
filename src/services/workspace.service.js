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

    return {

        message:
        "Workspace created successfully"

    };

}

module.exports = {
    createWorkspace
};