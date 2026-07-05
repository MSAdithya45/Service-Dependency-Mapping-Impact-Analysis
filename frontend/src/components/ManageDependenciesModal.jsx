import {

    X,
    Pencil,
    Trash2

}
from "lucide-react";


function ManageDependenciesModal({

    onClose

}){

    const dependencies = [

        {

            id:1,

            source:
            "User Service",

            target:
            "Payment Gateway",

            isMine:true

        },

        {

            id:2,

            source:
            "Order Service",

            target:
            "Inventory Service",

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

                    w-[760px]
                    max-h-[80vh]

                    overflow-y-auto

                    rounded-3xl

                    border
                    border-[var(--border)]

                    bg-[var(--card-bg)]

                    p-8

                "

            >

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

                        Manage Dependencies

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


                <div
                    className="mt-8 space-y-4"
                >

                    {

                        dependencies.map(

                            dependency=>(

                                <div

                                    key={dependency.id}

                                    className="

                                        max-w-[600px]
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

                                                font-semibold
                                                text-lg

                                            "

                                        >

                                            {

                                                dependency
                                                .source

                                            }

                                        </h3>


                                        <p

                                            className="

                                                text-sm
                                                text-[var(--text-secondary)]

                                            "

                                        >

                                            →

                                            {" "}

                                            {

                                                dependency
                                                .target

                                            }

                                        </p>

                                    </div>


                                    {

                                        dependency.isMine && (

                                            <div
                                                className="
                                                    flex
                                                    gap-3
                                                "
                                            >

                                                <button

                                                    onClick={()=>{

                                                        handleEdit(

                                                            dependency.id

                                                        );

                                                    }}

                                                    className="

                                                        p-3

                                                        rounded-xl

                                                        bg-cyan-500/15

                                                        text-cyan-400

                                                    "

                                                >

                                                    <Pencil size={18}/>

                                                </button>


                                                <button

                                                    onClick={()=>{

                                                        handleDelete(

                                                            dependency.id

                                                        );

                                                    }}

                                                    className="

                                                        p-3

                                                        rounded-xl

                                                        bg-red-500/15

                                                        text-red-400

                                                    "

                                                >

                                                    <Trash2 size={18}/>

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

                    "

                >

                    Close

                </button>

            </div>

        </div>

    );

}


export default ManageDependenciesModal;