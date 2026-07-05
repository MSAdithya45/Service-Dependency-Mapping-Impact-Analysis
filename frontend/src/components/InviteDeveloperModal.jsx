import {

    useState

}
from "react";

import {

    X,
    Copy,
    Check

}
from "lucide-react";


function InviteDeveloperModal({

    onClose

}){

    const [

        copied,
        setCopied

    ] = useState(false);


    const inviteCode =
    "DEV-ABC123";


    async function handleCopy(){

        await navigator
        .clipboard
        .writeText(
            inviteCode
        );

        setCopied(
            true
        );

        setTimeout(

            ()=>{

                setCopied(
                    false
                );

            },

            2000

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

                    w-[500px]

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

                        Invite Developer

                    </h2>


                    <button

                        onClick={onClose}

                        className="

                            p-2

                            rounded-lg

                            hover:bg-zinc-800

                            transition

                        "

                    >

                        <X
                            size={20}
                        />

                    </button>

                </div>


                <p

                    className="

                        mt-4

                        text-sm

                        text-[var(--text-secondary)]

                    "

                >

                    Share this invite code
                    with developers.

                </p>


                <div

                    className="

                        mt-8

                        flex
                        items-center
                        gap-4

                        rounded-2xl

                        border
                        border-[var(--border)]

                        bg-[var(--bg-primary)]

                        px-5
                        py-4

                    "

                >

                    <span

                        className="

                            flex-1

                            text-lg
                            font-semibold

                            tracking-wider

                        "

                    >

                        {inviteCode}

                    </span>


                    <button

                        onClick={
                            handleCopy
                        }

                        className="

                            btn-secondary

                            px-4
                            py-2

                            rounded-xl

                            flex
                            items-center
                            gap-2

                        "

                    >

                        {

                            copied

                            ?

                            <Check
                                size={18}
                            />

                            :

                            <Copy
                                size={18}
                            />

                        }

                        {

                            copied

                            ?

                            "Copied"

                            :

                            "Copy"

                        }

                    </button>

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


export default InviteDeveloperModal;