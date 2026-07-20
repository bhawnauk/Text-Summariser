import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {


return (

 <>   <main className="

        min-h-screen

        bg-[#f8fafc]

        text-slate-950

        dark:bg-slate-950

        dark:text-white

    ">


        <Navbar />


        <section className="

            mx-auto

            max-w-6xl

            px-6

            pb-24

            pt-6

            md:pt-6

        ">


            <div className="

                grid

                gap-16

                md:grid-cols-2

                md:items-center

            ">


                <div>


                   


                    <h1 className="

                        text-5xl

                        font-semibold

                        leading-tight

                        tracking-[-0.05em]

                        md:text-7xl

                    ">

                        Less reading.


                        <span className="

                            block

                            text-slate-400

                            dark:text-slate-500

                        ">

                            More understanding.

                        </span>


                    </h1>


                    <p className="

                        mt-8

                        max-w-xl

                        text-lg

                        leading-8

                        text-slate-500

                        dark:text-slate-400

                    ">

                        TextSummariser was created around a simple idea: information

                        should help people move forward, not slow them down.

                    </p>


                </div>


                <div className="

                    rounded-[2rem]

                    border

                    border-slate-200

                    bg-white

                    p-8

                    shadow-xl

                    shadow-slate-200/40

                    dark:border-slate-800

                    dark:bg-slate-900

                    dark:shadow-black/20

                ">


                    <div className="

                        flex

                        h-16

                        w-16

                        items-center

                        justify-center

                        rounded-2xl

                        bg-slate-950

                        text-2xl

                        text-white

                        dark:bg-white

                        dark:text-slate-950

                    ">

                        ✦

                    </div>


                    <h2 className="

                        mt-8

                        text-2xl

                        font-semibold

                    ">

                        The problem

                    </h2>


                    <p className="

                        mt-4

                        leading-8

                        text-slate-500

                        dark:text-slate-400

                    ">

                        There is more information than ever before. Articles,

                        reports, meetings and transcripts continue to grow,

                        while the time available to process them does not.

                    </p>


                </div>


            </div>


            <div className="

                mt-24

                grid

                gap-6

                md:grid-cols-3

            ">


                <AboutCard

                    title="Clarity"

                    text="Reduce the time between receiving information and understanding it."

                />


                <AboutCard

                    title="Control"

                    text="Decide how much detail you need and how the result should sound."

                />


                <AboutCard

                    title="Focus"

                    text="Keep the important ideas visible without unnecessary noise."

                />


            </div>


            <div className="

                mt-24

                rounded-[2rem]

                bg-slate-950

                p-8

                text-white

                md:p-14

                dark:bg-white

                dark:text-slate-950

            ">


                <div className="

                    grid

                    gap-8

                    md:grid-cols-2

                    md:items-end

                ">


                    <div>


                        <p className="

                            text-xs

                            font-semibold

                            uppercase

                            tracking-[0.2em]

                            opacity-60

                        ">

                            Our approach

                        </p>


                        <h2 className="

                            mt-4

                            text-3xl

                            font-semibold

                            tracking-tight

                            md:text-5xl

                        ">

                            Technology should make

                            <span className="block opacity-50">

                                thinking easier.

                            </span>

                        </h2>


                    </div>


                    <p className="

                        leading-8

                        opacity-70

                    ">

                        TextSummariser combines a thoughtful interface with AI-powered

                        processing to create a focused experience for working

                        with long-form information.

                    </p>


                </div>


            </div>


        </section>


    </main>
<Footer/>
</>
);


}

function AboutCard({


title,

text


}: {


title: string;

text: string;


}) {


return (

    <div className="

        rounded-[2rem]

        border

        border-slate-200

        bg-white

        p-7

        dark:border-slate-800

        dark:bg-slate-900

    ">


        <h3 className="

            text-xl

            font-semibold

        ">

            {title}

        </h3>


        <p className="

            mt-4

            leading-7

            text-slate-500

            dark:text-slate-400

        ">

            {text}

        </p>


    </div>

);


}
