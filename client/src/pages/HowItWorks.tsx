import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HowItWorks() {


return (
<>
    <main className="

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

                mx-auto

                max-w-3xl

                text-center

            ">


                <div className="

                    mb-6

                    inline-flex

                    items-center

                    gap-2

                    rounded-full

                    border

                    border-slate-200

                    bg-white

                    px-4

                    py-2

                    text-sm

                    text-slate-500

                    shadow-sm

                    dark:border-slate-800

                    dark:bg-slate-900

                    dark:text-slate-400

                ">

                    <span className="

                        h-2

                        w-2

                        rounded-full

                        bg-emerald-500

                    " />

                    Simple by design

                </div>


                <h1 className="

                    text-5xl

                    font-semibold

                    leading-tight

                    tracking-[-0.05em]

                    md:text-7xl

                ">

                    From long-form text


                    <span className="

                        block

                        text-slate-400

                        dark:text-slate-500

                    ">

                        to clear thinking.

                </span>


                </h1>


                <p className="

                    mx-auto

                    mt-8

                    max-w-2xl

                    text-lg

                    leading-8

                    text-slate-500

                    dark:text-slate-400

                ">

                    TextSummariser breaks down your content into the information

                    that matters most, without making you read everything

                    twice.

                </p>


            </div>


            <div className="

                mt-20

                grid

                gap-6

                md:grid-cols-3

            ">


                <StepCard

                    number="01"

                    title="Add your content"

                    description="Paste an article, report, transcript or any other text into the summariser."

                />


                <StepCard

                    number="02"

                    title="Choose your preferences"

                    description="Control the summary length and choose the tone that fits your needs."

                />


                <StepCard

                    number="03"

                    title="Get the signal"

                    description="TextSummariser processes your content and returns a focused summary in seconds."

                />


            </div>


            <div className="

                mt-20

                rounded-[2rem]

                border

                border-slate-200

                bg-white

                p-8

                shadow-xl

                shadow-slate-200/40

                md:p-12

                dark:border-slate-800

                dark:bg-slate-900

                dark:shadow-black/20

            ">


                <div className="

                    grid

                    gap-12

                    md:grid-cols-2

                    md:items-center

                ">


                    <div>


                        <p className="

                            text-xs

                            font-semibold

                            uppercase

                            tracking-[0.2em]

                            text-slate-400

                        ">

                            Built for trust

                        </p>


                        <h2 className="

                            mt-4

                            text-3xl

                            font-semibold

                            tracking-tight

                            md:text-4xl

                        ">

                            No black boxes.

                            <span className="

                                block

                                text-slate-400

                            ">

                                Just useful summaries.

                            </span>

                        </h2>


                        <p className="

                            mt-6

                            leading-8

                            text-slate-500

                            dark:text-slate-400

                        ">

                            Every part of the experience is designed to

                            make summarisation predictable. You control

                            the length, tone and input. The result is

                            presented clearly so you can quickly understand

                            what matters.

                        </p>


                    </div>


                    <div className="space-y-4">


                        <Feature

                            title="Adjustable length"

                            description="Choose how concise or detailed your summary should be."

                        />


                        <Feature

                            title="Clear processing"

                            description="Know when your content is being processed and when it is ready."

                        />


                        <Feature

                            title="Built for long content"

                            description="Large inputs can be cleaned and processed safely before summarisation."

                        />


                    </div>


                </div>


            </div>


        </section>


    </main>
<Footer/>
</>
);


}

function StepCard({


number,

title,

description


}: {


number: string;

title: string;

description: string;


}) {


return (

    <div className="

        rounded-[2rem]

        border

        border-slate-200

        bg-white

        p-7

        transition

        hover:-translate-y-1

        hover:shadow-xl

        dark:border-slate-800

        dark:bg-slate-900

    ">


        <p className="

            text-sm

            font-semibold

            text-slate-400

        ">

            {number}

        </p>


        <h3 className="

            mt-8

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

            {description}

        </p>


    </div>

);


}

function Feature({


title,

description


}: {


title: string;

description: string;


}) {


return (

    <div className="

        rounded-2xl

        border

        border-slate-200

        p-5

        dark:border-slate-800

    ">


        <div className="flex items-start gap-4">


            <div className="

                mt-1

                flex

                h-8

                w-8

                shrink-0

                items-center

                justify-center

                rounded-xl

                bg-slate-950

                text-sm

                text-white

                dark:bg-white

                dark:text-slate-950

            ">

                ✓

            </div>


            <div>


                <h3 className="font-semibold">

                    {title}

                </h3>


                <p className="

                    mt-1

                    text-sm

                    leading-6

                    text-slate-500

                    dark:text-slate-400

                ">

                    {description}

                </p>


            </div>


        </div>


    </div>

);


}
