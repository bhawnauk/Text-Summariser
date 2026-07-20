interface SummaryCardProps {

    summary: string;

    format: string;

}


export default function SummaryCard({

    summary,

    format

}: SummaryCardProps) {


    const lines = summary

        .split("\n")

        .map((line) => line.trim())

        .filter(Boolean);


    const isBulletSummary = format === "bullets";


    return (

        <div className="

            mt-8

            overflow-hidden

            rounded-3xl

            border

            border-slate-200

            bg-white

            shadow-xl

            shadow-slate-200/50

            dark:border-slate-800

            dark:bg-slate-950

            dark:shadow-black/20

        ">


            {/* Header */}

            <div className="

                flex

                items-center

                justify-between

                border-b

                border-slate-100

                px-6

                py-5

                dark:border-slate-800

            ">


                <div className="flex items-center gap-3">


                    <div className="

                        flex

                        h-9

                        w-9

                        items-center

                        justify-center

                        rounded-xl

                        bg-slate-950

                        text-sm

                        text-white

                        dark:bg-white

                        dark:text-slate-950

                    ">


                        ✦


                    </div>


                    <div>


                        <p className="

                            text-sm

                            font-semibold

                            text-slate-950

                            dark:text-white

                        ">


                            Summary


                        </p>


                        <p className="

                            text-xs

                            text-slate-400

                        ">


                            Generated locally with AI


                        </p>


                    </div>


                </div>


                <button

                    onClick={() =>

                        navigator.clipboard.writeText(summary)

                    }

                    className="

                        rounded-lg

                        px-3

                        py-2

                        text-xs

                        font-medium

                        text-slate-500

                        transition

                        hover:bg-slate-100

                        hover:text-slate-950

                        dark:hover:bg-slate-800

                        dark:hover:text-white

                    "

                >


                    Copy


                </button>


            </div>


            {/* Summary Content */}

            <div className="

                px-6

                py-8

                text-base

                leading-8

                text-slate-700

                dark:text-slate-300

            ">


                {isBulletSummary ? (


                    <ul className="space-y-4">


                        {lines.map((line, index) => {


                            const cleanLine = line.replace(

                                /^[-•*]\s*/,

                                ""

                            );


                            return (

                                <li

                                    key={index}

                                    className="

                                        flex

                                        gap-3

                                        leading-7

                                    "

                                >


                                    <span className="

                                        mt-3

                                        h-2

                                        w-2

                                        shrink-0

                                        rounded-full

                                        bg-slate-950

                                        dark:bg-white

                                    " />


                                    <span>

                                        {cleanLine}

                                    </span>


                                </li>

                            );

                        })}


                    </ul>


                ) : (


                    <p className="

                        whitespace-pre-line

                    ">


                        {summary}


                    </p>


                )}


            </div>


        </div>

    );

}