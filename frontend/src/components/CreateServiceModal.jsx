import { useState } from "react";

import { X } from "lucide-react";


function CreateServiceModal({

    domains,
    onClose

}){

    const [

        domainId,
        setDomainId

    ] = useState(

        domains?.[0]?.id || ""

    );


    const [

        serviceName,
        setServiceName

    ] = useState("");


    function handleCreateService(){

        if(

            !domainId ||
            !serviceName.trim()

        ){

            alert(
                "Please fill all fields"
            );

            return;

        }


        console.log({

            domain_id:
            domainId,

            service_name:
            serviceName

        });


        alert(
            "Create Service API coming soon!"
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

                        Create Service

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

                            Domain

                        </label>


                        <select

                            value={domainId}

                            onChange={event=>{

                                setDomainId(

                                    event
                                    .target
                                    .value

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

                            {

                                domains.map(

                                    domain=>(

                                        <option

                                            key={domain.id}

                                            value={domain.id}

                                        >

                                            {

                                                domain
                                                .domain_name

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

                            Service Name

                        </label>


                        <input

                            value={serviceName}

                            onChange={event=>{

                                setServiceName(

                                    event
                                    .target
                                    .value

                                );

                            }}

                            placeholder="User Service"

                            className="

                                mt-2

                                w-full

                                px-4
                                py-3

                                rounded-xl

                                bg-[var(--bg-primary)]

                                border
                                border-[var(--border)]

                                outline-none

                            "

                        />

                    </div>

                </div>


                <button

                    onClick={
                        handleCreateService
                    }

                    className="

                        btn-primary

                        mt-8

                        w-full

                        py-3

                        rounded-xl

                    "

                >

                    Create Service

                </button>

            </div>

        </div>

    );

}


export default CreateServiceModal;