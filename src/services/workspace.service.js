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


async function getWorkspaces(
    userId
){

    const memberships =
    await prisma.workspace_members.findMany({

        where:{
            user_id:userId
        },

        include:{
            workspaces:true
        }

    });

    const workspaces =
    memberships.map(

        member => member.workspaces

    );

    return {

        PERSONAL:

        workspaces.filter(

            workspace =>

            workspace.workspace_type ===
            "PERSONAL"

        ),

        TEAM:

        workspaces.filter(

            workspace =>

            workspace.workspace_type ===
            "TEAM"

        )

    };

}


async function updateWorkspaceName(
    workspaceId,
    data
){

    const {
        workspace_name
    } = data;

    if(!workspace_name){

        throw new Error(
            "Workspace name is required"
        );

    }

    const workspace =
    await prisma.workspaces.findUnique({

        where:{
            id:Number(workspaceId)
        }

    });

    if(!workspace){

        throw new Error(
            "Workspace not found"
        );

    }

    const existingWorkspace =
    await prisma.workspaces.findFirst({

        where:{

            owner_user_id:
            workspace.owner_user_id,

            workspace_name:
            workspace_name,

            NOT:{
                id:Number(workspaceId)
            }

        }

    });

    if(existingWorkspace){

        throw new Error(
            "Workspace name already exists"
        );

    }

    await prisma.workspaces.update({

        where:{
            id:Number(workspaceId)
        },

        data:{

            workspace_name
        }

    });

    return {

        message:
        "Workspace updated successfully"

    };

}



async function deleteWorkspace(
    workspaceId
){

    const workspace =
    await prisma.workspaces.findUnique({

        where:{
            id:Number(workspaceId)
        }

    });

    if(!workspace){

        throw new Error(
            "Workspace not found"
        );

    }

    if(
        workspace.workspace_type !==
        "TEAM"
    ){

        throw new Error(
            "Only TEAM workspaces can be deleted"
        );

    }

    const domainExists =
    await prisma.domains.findFirst({

        where:{

            workspace_id:
            Number(workspaceId)

        }

    });

    if(domainExists){

        throw new Error(
            "Cannot delete workspace. Domains exist."
        );

    }

    await prisma.workspaces.delete({

        where:{
            id:Number(workspaceId)
        }

    });

    return {

        message:
        "Workspace deleted successfully"

    };

}


async function transferWorkspaceOwnership(
    workspaceId,
    data
){

    const {
        owner_user_id
    } = data;

    if(!owner_user_id){

        throw new Error(
            "Owner user id is required"
        );

    }

    const user =
    await prisma.users.findUnique({

        where:{
            id:Number(owner_user_id)
        }

    });

    if(!user){

        throw new Error(
            "User not found"
        );

    }

    const lead =
    await prisma.workspace_members
    .findFirst({

        where:{

            workspace_id:
            Number(workspaceId),

            user_id:
            Number(owner_user_id),

            role:
            "LEAD"

        }

    });

    if(!lead){

        throw new Error(
            "New owner must be a domain lead in this workspace"
        );

    }

    await prisma.workspaces.update({

        where:{
            id:Number(workspaceId)
        },

        data:{

            owner_user_id:
            Number(owner_user_id)

        }

    });

    return {

        message:
        "Workspace ownership transferred successfully"

    };

}

async function updatePersonalWorkspaceName(
    workspaceId,
    data
){

    const {
        workspace_name
    } = data;

    if(!workspace_name){

        throw new Error(
            "Workspace name is required"
        );

    }

    const workspace =
    await prisma.workspaces.findUnique({

        where:{
            id:Number(workspaceId)
        }

    });

    const existingWorkspace =
    await prisma.workspaces.findFirst({

        where:{

            owner_user_id:
            workspace.owner_user_id,

            workspace_name,

            NOT:{
                id:Number(workspaceId)
            }

        }

    });

    if(existingWorkspace){

        throw new Error(
            "Workspace name already exists"
        );

    }

    await prisma.workspaces.update({

        where:{
            id:Number(workspaceId)
        },

        data:{
            workspace_name
        }

    });

    return {

        message:
        "Personal workspace updated successfully"

    };

}


async function deletePersonalWorkspace(
    workspaceId
){

    const workspace =
    await prisma.workspaces.findUnique({

        where:{
            id:Number(workspaceId)
        }

    });

    if(!workspace){

        throw new Error(
            "Workspace not found"
        );

    }

    if(
        workspace.workspace_type !==
        "PERSONAL"
    ){

        throw new Error(
            "Not a personal workspace"
        );

    }

    await prisma.workspaces.delete({

        where:{
            id:Number(workspaceId)
        }

    });

    return {

        message:
        "Personal workspace deleted successfully"

    };

}


module.exports = {

    createWorkspace,
    getWorkspaces,
    updateWorkspaceName,
    deleteWorkspace,
    transferWorkspaceOwnership,
    updatePersonalWorkspaceName,
    deletePersonalWorkspace

};