import { useState } from "react";

import { X } from "lucide-react";


function CreateDependencyModal({

    services = [],
    onClose

}){

    const [

        sourceServiceId,
        setSourceServiceId

    ] = useState("");


    const [

        targetServiceId,
        setTargetServiceId

    ] = useState("");


    function handleCreateDependency(){

        if(

            !sourceServiceId ||
            !targetServiceId

        ){

            alert(
                "Please select both services"
            );

            return;

        }


        if(

            sourceServiceId ===
            targetServiceId

        ){

            alert(
                "Source and Target services cannot be the same"
            );

            return;

        }


        console.log({

            source_service_id:
            Number(sourceServiceId),

            target_service_id:
            Number(targetServiceId)

        });


        alert(
            "Create Dependency API coming soon!"
        );

    }


    return(

        <div

            className="

                fixed
                inset-0

                bg-black/60

                flex
                items-center
                justify-center

                z-50

            "

        >

            <div

                className="

                    w-[520px]

                    rounded-3xl

                    border
                    border-[var(--border)]

                    bg-[var(--card-bg)]

                    p-8

                "

            >

                {/* HEADER */}

                <div

                    className="

                        flex
                        items-center
                        justify-between

                    "

                >

                    <h2

                        className="

                            text-2xl
                            font-bold

                        "

                    >

                        Create Dependency

                    </h2>


                    <button

                        onClick={onClose}

                        className="

                            p-2

                            rounded-lg

                            hover:bg-zinc-800

                        "

                    >

                        <X size={20}/>

                    </button>

                </div>


                {/* FORM */}

                <div
                    className="mt-8 space-y-6"
                >

                    <div>

                        <label
                            className="text-sm"
                        >

                            Source Service

                        </label>


                        <select

                            value={sourceServiceId}

                            onChange={event=>{

                                setSourceServiceId(

                                    event.target.value

                                );

                            }}

                            className="

                                mt-2

                                w-full

                                px-4
                                py-3

                                rounded-xl

                                bg-[var(--bg-primary)]

                                border
                                border-[var(--border)]

                            "

                        >

                            <option value="">

                                Select Source Service

                            </option>


                            {

                                services.map(

                                    service=>(

                                        <option

                                            key={service.id}

                                            value={service.id}

                                        >

                                            {

                                                service
                                                .service_name

                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>


                    <div>

                        <label
                            className="text-sm"
                        >

                            Target Service

                        </label>


                        <select

                            value={targetServiceId}

                            onChange={event=>{

                                setTargetServiceId(

                                    event.target.value

                                );

                            }}

                            className="

                                mt-2

                                w-full

                                px-4
                                py-3

                                rounded-xl

                                bg-[var(--bg-primary)]

                                border
                                border-[var(--border)]

                            "

                        >

                            <option value="">

                                Select Target Service

                            </option>


                            {

                                services.map(

                                    service=>(

                                        <option

                                            key={service.id}

                                            value={service.id}

                                        >

                                            {

                                                service
                                                .service_name

                                            }

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>

                </div>


                <button

                    onClick={
                        handleCreateDependency
                    }

                    className="

                        btn-primary

                        mt-8

                        w-full

                        py-3

                        rounded-xl

                    "

                >

                    Create Dependency

                </button>

            </div>

        </div>

    );

}


export default CreateDependencyModal;