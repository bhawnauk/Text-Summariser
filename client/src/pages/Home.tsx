import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import LoadingCard from "../components/LoadingCard";
import SummaryCard from "../components/SummaryCard";
import Footer from "../components/Footer";
import { data } from "react-router-dom";

const MAX_WORDS = 2000;

export default function Home() {


const [text, setText] = useState("");

const [file, setFile] = useState<File | null>(null);

const [loading, setLoading] = useState(false);

const [summary, setSummary] = useState("");

const [error, setError] = useState("");

const [length, setLength] = useState("medium");

const [tone, setTone] = useState("professional");

const [format, setFormat] = useState("paragraph");


const words = text

    .trim()

    .split(/\s+/)

    .filter(Boolean)

    .length;


function handleText(

    e: React.ChangeEvent<HTMLTextAreaElement>

) {


    const value = e.target.value;


    const count = value

        .trim()

        .split(/\s+/)

        .filter(Boolean)

        .length;


    if (count <= MAX_WORDS) {

        setText(value);

        setError("");

    }

}


async function generate() {


    if (!text.trim()) {

        setError(

            "Add some text first and we'll turn it into a clear summary."

        );

        return;

    }


    setLoading(true);

    setSummary("");

    setError("");


    try {


        const response = await fetch(

            "http://localhost:5050/api/summarise",

            {

                method: "POST",

                headers: {

                    "Content-Type":

                        "application/json"

                },

                body: JSON.stringify({

                    text,

                    length,

                    tone,
                    format

                })

            }

        );


         const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.error || "Failed to generate summary.");
            }
 
            setSummary(data.summary);
        } catch (error) {
            console.error("Summary generation error:", error);
            setError(
                error instanceof Error ? error.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }


    
}


return (

    <main className="

        min-h-screen

        overflow-hidden

        bg-[#f8fafc]

        text-slate-950

        dark:bg-slate-950

        dark:text-white

    ">


        {/* Background decoration */}

        <div className="

            pointer-events-none

            fixed

            inset-0

            -z-10

            overflow-hidden

        ">


            <div className="

                absolute

                left-1/2

                top-[-300px]

                h-[600px]

                w-[600px]

                -translate-x-1/2

                rounded-full

                bg-blue-200/30

                blur-3xl

                dark:bg-blue-900/20

            " />


            <div className="

                absolute

                bottom-[-300px]

                right-[-200px]

                h-[500px]

                w-[500px]

                rounded-full

                bg-indigo-200/30

                blur-3xl

                dark:bg-indigo-900/20

            " />


        </div>


        {/* Navigation */}

        <Navbar/>


        {/* Hero */}

        <section className="

            mx-auto

            max-w-6xl

            px-6

            pb-16

            pt-6

            text-center

            md:pb-24

            md:pt-6

        ">


            <div className="

                mx-auto

                mb-7

                inline-flex

                items-center

                gap-2

                rounded-full

                border

                border-slate-200

                bg-white/70

                px-4

                py-2

                text-sm

                text-slate-600

                shadow-sm

                backdrop-blur

                dark:border-slate-800

                dark:bg-slate-900/70

                dark:text-slate-300

            ">


                <span className="

                    h-2

                    w-2

                    animate-pulse

                    rounded-full

                    bg-emerald-500

                " />


                AI-powered clarity

            </div>


            <h1 className="

                mx-auto

                max-w-5xl

                text-6xl

                font-semibold

                leading-[0.95]

                tracking-[-0.06em]

                sm:text-7xl

                md:text-8xl

            ">


                Turn noise


                <span className="

                    block

                    text-slate-400

                    dark:text-slate-500

                ">

                    into clarity.

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


                Transform articles, reports and transcripts into

                focused summaries without losing what matters.


            </p>


            {/* Metrics */}

            <div className="

                mx-auto

                mt-12

                grid

                max-w-2xl

                grid-cols-3

                divide-x

                divide-slate-200

                dark:divide-slate-800

            ">


                <div className="px-4">


                    <p className="

                        text-2xl

                        font-semibold

                    ">

                        2k

                    </p>


                    <p className="

                        mt-1

                        text-[10px]

                        uppercase

                        tracking-[0.2em]

                        text-slate-400

                    ">

                        Word limit

                    </p>


                </div>


                <div className="px-4">


                    <p className="

                        text-2xl

                        font-semibold

                    ">

                        ~3s

                    </p>


                    <p className="

                        mt-1

                        text-[10px]

                        uppercase

                        tracking-[0.2em]

                        text-slate-400

                    ">

                        Response time

                    </p>


                </div>


                <div className="px-4">


                    <p className="

                        text-2xl

                        font-semibold

                    ">

                        Local

                    </p>


                    <p className="

                        mt-1

                        text-[10px]

                        uppercase

                        tracking-[0.2em]

                        text-slate-400

                    ">

                        AI powered

                    </p>


                </div>


            </div>


        </section>


        {/* Main Workspace */}

        <section

            id="summariser"

            className="

                mx-auto

                max-w-6xl

                scroll-mt-10

                px-6

                pb-24

            "

        >


            <div className="

                grid

                gap-6

                lg:grid-cols-[1fr_0.9fr]

            ">


                {/* Input panel */}

                <div className="

                    rounded-[2rem]

                    border

                    border-slate-200/80

                    bg-white/80

                    p-6

                    shadow-xl

                    shadow-slate-200/40

                    backdrop-blur-xl

                    md:p-8

                    dark:border-slate-800

                    dark:bg-slate-900/80

                    dark:shadow-black/20

                ">


                    <div className="

                        mb-6

                        flex

                        items-start

                        justify-between

                    ">


                        <div>


                            <p className="

                                text-xs

                                font-semibold

                                uppercase

                                tracking-[0.2em]

                                text-slate-400

                            ">

                                Your input

                            </p>


                            <h2 className="

                                mt-2

                                text-2xl

                                font-semibold

                                tracking-tight

                            ">

                                What should we summarise?

                            </h2>


                        </div>


                        <span className="

                            rounded-full

                            bg-slate-100

                            px-3

                            py-1.5

                            text-xs

                            text-slate-500

                            dark:bg-slate-800

                            dark:text-slate-400

                        ">

                            {words.toLocaleString()}/

                            {MAX_WORDS.toLocaleString()}

                        </span>


                    </div>


                    <textarea

                        value={text}

                        onChange={handleText}

                        placeholder="

                            Paste an article, report or transcript here...

                        "

                        className="

                            h-72

                            w-full

                            resize-none

                            rounded-2xl

                            border

                            border-slate-200

                            bg-slate-50/70

                            p-5

                            text-base

                            leading-7

                            outline-none

                            transition

                            placeholder:text-slate-400

                            focus:border-blue-400

                            focus:ring-4

                            focus:ring-blue-500/10

                            dark:border-slate-700

                            dark:bg-slate-950/50

                            dark:placeholder:text-slate-600

                        "

                    />


                    <div className="mt-5">


                        <p className="

                            mb-3

                            text-xs

                            font-semibold

                            uppercase

                            tracking-[0.2em]

                            text-slate-400

                        ">

                            Summary length

                        </p>


                        <div className="

                            flex

                            rounded-2xl

                            bg-slate-100

                            p-1

                            dark:bg-slate-800

                        ">


                            {["short", "medium", "long"].map(

                                (option) => (


                                    <button

                                        key={option}

                                        onClick={() =>

                                            setLength(option)

                                        }

                                        className={`

                                            flex-1

                                            rounded-xl

                                            px-4

                                            py-3

                                            text-sm

                                            capitalize

                                            transition

                                            ${

                                                length === option

                                                    ? "bg-white font-medium text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"

                                                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"

                                            }

                                        `}

                                    >

                                        {option}

                                    </button>


                                )

                            )}

                        </div>


                    </div>


                    <div className="mt-5">


                        <p className="

                            mb-3

                            text-xs

                            font-semibold

                            uppercase

                            tracking-[0.2em]

                            text-slate-400

                        ">

                            Tone

                        </p>


                        <div className="

                            flex

                            flex-wrap

                            gap-2

                        ">


                            {[

                                "professional",

                                "casual",

                                "bullet"

                            ].map((option) => (


                                <button

                                    key={option}

                                    onClick={() =>

                                        setTone(option)

                                    }

                                    className={`

                                        rounded-full

                                        border

                                        px-4

                                        py-2.5

                                        text-sm

                                        capitalize

                                        transition

                                        ${

                                            tone === option

                                                ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"

                                                : "border-slate-200 text-slate-500 hover:border-slate-400 dark:border-slate-700"

                                        }

                                    `}

                                >

                                    {option}

                                </button>


                            ))}


                        </div>


                    </div>


                    <UploadBox

                        onUpload={(uploadedFile) =>

                            setFile(uploadedFile)

                        }

                    />


                    {file && (

                        <p className="

                            mt-3

                            text-sm

                            text-emerald-600

                            dark:text-emerald-400

                        ">

                            ✓ {file.name}

                        </p>

                    )}


                    {error && (

                        <div className="

                            mt-5

                            rounded-2xl

                            border

                            border-red-200

                            bg-red-50

                            p-4

                            text-sm

                            text-red-600

                            dark:border-red-900

                            dark:bg-red-950/30

                            dark:text-red-400

                        ">

                            {error}

                        </div>

                    )}


                    <button

                        onClick={generate}

                        disabled={loading}

                        className="

                            mt-6

                            flex

                            w-full

                            items-center

                            justify-center

                            gap-2

                            rounded-2xl

                            bg-slate-950

                            py-4

                            font-semibold

                            text-white

                            shadow-xl

                            shadow-slate-950/20

                            transition

                            hover:-translate-y-0.5

                            hover:shadow-2xl

                            disabled:cursor-not-allowed

                            disabled:opacity-50

                            dark:bg-white

                            dark:text-slate-950

                        "

                    >

                        <span>

                            ✦

                        </span>


                        {loading

                            ? "Generating..."

                            : "Generate summary"

                        }

                    </button>


                </div>


                {/* Output panel */}

                <div className="

                    min-h-[600px]

                    rounded-[2rem]

                    border

                    border-slate-200/80

                    bg-white/70

                    p-6

                    shadow-xl

                    shadow-slate-200/40

                    backdrop-blur-xl

                    md:p-8

                    dark:border-slate-800

                    dark:bg-slate-900/70

                    dark:shadow-black/20

                ">


                    <div className="

                        mb-6

                        flex

                        items-start

                        justify-between

                    ">


                        <div>


                            <p className="

                                text-xs

                                font-semibold

                                uppercase

                                tracking-[0.2em]

                                text-slate-400

                            ">

                                Output

                            </p>


                            <h2 className="

                                mt-2

                                text-2xl

                                font-semibold

                                tracking-tight

                            ">

                                Your summary

                            </h2>


                        </div>


                        {summary && (

                            <button

                                onClick={() =>

                                    navigator.clipboard.writeText(

                                        summary

                                    )

                                }

                                className="

                                    rounded-xl

                                    border

                                    border-slate-200

                                    px-3

                                    py-2

                                    text-xs

                                    text-slate-500

                                    transition

                                    hover:bg-slate-100

                                    dark:border-slate-700

                                    dark:hover:bg-slate-800

                                "

                            >

                                Copy

                            </button>

                        )}


                    </div>


                    {!loading && !summary && (

                        <div className="

                            flex

                            min-h-[480px]

                            items-center

                            justify-center

                            rounded-2xl

                            border

                            border-dashed

                            border-slate-200

                            bg-slate-50/50

                            p-8

                            text-center

                            dark:border-slate-800

                            dark:bg-slate-950/30

                        ">


                            <div>


                                <div className="

                                    mx-auto

                                    flex

                                    h-14

                                    w-14

                                    items-center

                                    justify-center

                                    rounded-2xl

                                    bg-slate-100

                                    text-xl

                                    text-slate-400

                                    dark:bg-slate-800

                                ">

                                    ✦

                                </div>


                                <p className="

                                    mt-5

                                    font-medium

                                    text-slate-700

                                    dark:text-slate-300

                                ">

                                    Your summary will appear here

                                </p>


                                <p className="

                                    mx-auto

                                    mt-2

                                    max-w-xs

                                    text-sm

                                    leading-6

                                    text-slate-400

                                ">

                                    Add your content, choose your

                                    preferences and let AI find the signal.

                                </p>


                            </div>


                        </div>

                    )}


                    {loading && (

                        <LoadingCard />

                    )}


                    {summary && (

                        <SummaryCard

                            summary={summary}

                        />

                    )}


                </div>


            </div>


        </section>


        {/* Footer */}

        <Footer/>

    </main>

);


}
