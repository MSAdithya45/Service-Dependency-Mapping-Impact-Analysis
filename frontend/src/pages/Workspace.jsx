import {

    useEffect,
    useState

}
from "react";

import {

    useParams

}
from "react-router-dom";

import {

    getWorkspaceGraph,
    generateImpactReport as generateReport

}
from "../services/workspaceService";

import JoinWorkspaceCards
from "../components/JoinWorkspaceCards";

import WorkspaceHeader
from "../components/WorkspaceHeader";

import WorkspaceActions
from "../components/WorkspaceActions";

import LeadActions
from "../components/LeadActions";

import DeveloperActions
from "../components/DeveloperActions";

import GraphView
from "../components/GraphView";

import ImpactSummary
from "../components/ImpactSummary";


function Workspace(){

    const {

        id

    } = useParams();


    const [

        loading,
        setLoading

    ] = useState(true);


    const [

        workspace,
        setWorkspace

    ] = useState(null);


    const [

        roles,
        setRoles

    ] = useState([]);


    const [

        notMember,
        setNotMember

    ] = useState(false);


    const [

        impactReport,
        setImpactReport

    ] = useState(null);


    const [

        selectedService,
        setSelectedService

    ] = useState(null);


    useEffect(

        ()=>{

            fetchWorkspace();

        },

        [id]

    );


    async function fetchWorkspace(){

        try{

            const data =

            await getWorkspaceGraph(id);

            setWorkspace(data);

            setRoles(

                data.roles || []

            );

        }
        catch(error){

            if(

                error.response?.data?.message ===

                "Only workspace members can view the graph"

            ){

                setNotMember(true);

            }

        }
        finally{

            setLoading(false);

        }

    }


    async function handleGenerateImpactReport(){

        if(!selectedService){

            alert(
                "Please select a service first"
            );

            return;

        }

        try{

            const response =

            await generateReport(

                id,

                selectedService.id

            );

            setImpactReport(
                response
            );

        }
        catch(error){

            alert(

                error.response
                ?.data
                ?.message

                ||

                "Failed to generate report"

            );

        }

    }


    if(loading){

        return(

            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                "
            >

                Loading...

            </div>

        );

    }


    if(notMember){

        return(

            <JoinWorkspaceCards
                workspaceId={id}
            />

        );

    }


    const isOwner =
    roles.includes(
        "OWNER"
    );


    const isLead =
    roles.includes(
        "LEAD"
    );


    const isDeveloper =
    roles.includes(
        "DEVELOPER"
    );


    const dashboardTitle =

        isOwner && isLead

        ?

        "Owner & Lead Dashboard"

        :

        isOwner

        ?

        "Owner Dashboard"

        :

        isLead

        ?

        "Lead Dashboard"

        :

        "Developer Dashboard";


    const dashboardDescription =

        isOwner && isLead

        ?

        "Manage your workspace, developers, services and dependencies."

        :

        isOwner

        ?

        "Manage your workspace, leads and domains."

        :

        isLead

        ?

        "Manage your developers, services and dependencies."

        :

        "Read-only access to services and impact reports.";


    return(

        <div
            className="
                min-h-screen
                bg-[var(--bg-primary)]
                text-[var(--text-primary)]
            "
        >

            <WorkspaceHeader

                roles={roles}

                workspace={workspace}

                setWorkspace={setWorkspace}

            />


            <main
                className="
                    px-6
                    py-6
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >

                    {dashboardTitle}

                </h1>


                <p
                    className="
                        mt-2
                        text-[var(--text-secondary)]
                    "
                >

                    {dashboardDescription}

                </p>


                {

                    isOwner && (

                        <WorkspaceActions

                            workspace={workspace}

                            roles={roles}

                        />

                    )

                }


                {

                    isLead && (

                        <LeadActions

                            workspace={workspace}

                            roles={roles}

                        />

                    )

                }


                {

                    isDeveloper

                    &&

                    !isOwner

                    &&

                    !isLead && (

                        <DeveloperActions

                            workspace={workspace}

                        />

                    )

                }


                <div
                    className="
                        grid
                        grid-cols-[2fr_1fr]
                        gap-6
                        mt-6
                    "
                >

                    <GraphView

                        nodes={
                            workspace?.nodes || []
                        }

                        edges={
                            workspace?.edges || []
                        }

                        selectedService={
                            selectedService
                        }

                        onSelectService={
                            setSelectedService
                        }

                    />


                    <ImpactSummary

                        selectedService={
                            selectedService
                        }

                        impactReport={
                            impactReport
                        }

                        onGenerateReport={
                            handleGenerateImpactReport
                        }

                    />

                </div>

            </main>

        </div>

    );

}

export default Workspace;