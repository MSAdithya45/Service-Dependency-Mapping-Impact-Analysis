import { useState } from "react";

import {

    X,
    Pencil,
    Trash2

} from "lucide-react";


function ManageServicesModal({

    onClose

}){

    const services = [

        {

            id:1,

            service_name:
            "User Service",

            domain_name:
            "Payments",

            isMine:true

        },

        {

            id:2,

            service_name:
            "Payment Gateway",

            domain_name:
            "Payments",

            isMine:true

        },

        {

            id:3,

            service_name:
            "Order Service",

            domain_name:
            "Orders",

            isMine:false

        }

    ];


    function handleEdit(
        id
    ){

        alert(
            `Edit ${id} coming soon!`
        );

    }


    function handleDelete(
        id
    ){

        alert(
            `Delete ${id} coming soon!`
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

                    w-[700px]
                    max-h-[80vh]

                    overflow-y-auto

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

                        Manage Services

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


                {/* SERVICES */}

                <div

                    className="

                        mt-8
                        space-y-4

                    "

                >

                    {

                        services.map(

                            service=>(

                                <div

                                    key={service.id}

                                    className="

                                        max-w-[550px]
                                        mx-auto

                                        rounded-2xl

                                        border
                                        border-[var(--border)]

                                        bg-[var(--bg-primary)]

                                        px-6
                                        py-5

                                        flex
                                        items-center
                                        justify-between

                                    "

                                >

                                    <div>

                                        <h3

                                            className="

                                                text-lg
                                                font-semibold

                                            "

                                        >

                                            {

                                                service
                                                .service_name

                                            }

                                        </h3>


                                        <p

                                            className="

                                                text-sm

                                                text-[var(--text-secondary)]

                                            "

                                        >

                                            Domain:

                                            {" "}

                                            {

                                                service
                                                .domain_name

                                            }

                                        </p>

                                    </div>


                                    {

                                        service.isMine && (

                                            <div

                                                className="

                                                    flex
                                                    items-center
                                                    gap-3

                                                "

                                            >

                                                <button

                                                    onClick={()=>{

                                                        handleEdit(

                                                            service.id

                                                        );

                                                    }}

                                                    className="

                                                        p-3

                                                        rounded-xl

                                                        bg-cyan-500/15

                                                        text-cyan-400

                                                        hover:bg-cyan-500/25

                                                        transition

                                                    "

                                                >

                                                    <Pencil
                                                        size={18}
                                                    />

                                                </button>


                                                <button

                                                    onClick={()=>{

                                                        handleDelete(

                                                            service.id

                                                        );

                                                    }}

                                                    className="

                                                        p-3

                                                        rounded-xl

                                                        bg-red-500/15

                                                        text-red-400

                                                        hover:bg-red-500/25

                                                        transition

                                                    "

                                                >

                                                    <Trash2
                                                        size={18}
                                                    />

                                                </button>

                                            </div>

                                        )

                                    }

                                </div>

                            )

                        )

                    }

                </div>


                <button

                    onClick={onClose}

                    className="

                        mt-8

                        w-full

                        py-3

                        rounded-xl

                        border
                        border-[var(--border)]

                        hover:bg-zinc-800

                        transition

                    "

                >

                    Close

                </button>

            </div>

        </div>

    );

}


export default ManageServicesModal;