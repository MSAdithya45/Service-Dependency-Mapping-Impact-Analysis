const workspaceService =
require("../services/workspace.service");

exports.createWorkspace =
async(req,res)=>{

    try{

        const result =
        await workspaceService
        .createWorkspace(

            req.body,

            req.user.userId

        );

        res.status(201)
        .json(result);

    }
    catch(error){

        res.status(400)
        .json({
            message:error.message
        });

    }

};