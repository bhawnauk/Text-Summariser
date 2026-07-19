import { Link } from "react-router-dom";

export default function Footer() {


    function scrollToTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    return (

    <footer

            onClick={scrollToTop}

            className="

                cursor-pointer

                border-t

                border-slate-200

                bg-white

                dark:border-slate-800

                dark:bg-slate-950

            "

        >


        <div className="

            mx-auto

            max-w-7xl

            px-6

            py-12

            md:py-16

        ">


            <div className="

                grid

                gap-10

                md:grid-cols-[1.5fr_1fr_1fr]

            ">


                {/* Brand */}

                <div>


                    <Link

                        to="/"

                        className="

                            inline-flex

                            items-center

                            gap-3

                        "

                    >


                        <div className="

                            flex

                            h-10

                            w-10

                            items-center

                            justify-center

                            rounded-2xl

                            bg-slate-950

                            text-lg

                            text-white

                            shadow-lg

                            shadow-slate-950/20

                            dark:bg-white

                            dark:text-slate-950

                        ">

                            ✦

                        </div>


                        <span className="

                            text-xl

                            font-semibold

                            tracking-tight

                        ">

                            Text Summariser

                        </span>


                    </Link>


                    <p className="

                        mt-5

                        max-w-sm

                        text-sm

                        leading-7

                        text-slate-500

                        dark:text-slate-400

                    ">

                        A focused AI summarisation tool for turning

                        long-form information into clear, useful insight.

                    </p>


                </div>


                {/* Navigation */}

                <div>


                    <p className="

                        text-sm

                        font-semibold

                        text-slate-950

                        dark:text-white

                    ">

                        Explore

                    </p>


                    <div className="

                        mt-5

                        flex

                        flex-col

                        gap-3

                        text-sm

                        text-slate-500

                        dark:text-slate-400

                    ">


                        <Link

                            to="/"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            Product

                        </Link>


                        <Link

                            to="/how-it-works"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            How it works

                        </Link>


                        <Link

                            to="/about"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            About

                        </Link>


                    </div>


                </div>


                {/* Contact */}

                <div>


                    <p className="

                        text-sm

                        font-semibold

                        text-slate-950

                        dark:text-white

                    ">

                        Connect

                    </p>


                    <div className="

                        mt-5

                        flex

                        flex-col

                        gap-3

                        text-sm

                        text-slate-500

                        dark:text-slate-400

                    ">


                        <a

                            href="mailto:bhawnayadav.uk@gmail.com"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            bhawnayadav.uk@gmail.com

                        </a>


                        <a

                            href="https://linkedin.com/in/bhawnayadavuk"

                            target="_blank"

                            rel="noreferrer"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            LinkedIn ↗

                        </a>


                        <a

                            href="https://github.com/bhawnauk"

                            target="_blank"

                            rel="noreferrer"

                            className="

                                transition

                                hover:text-slate-950

                                dark:hover:text-white

                            "

                        >

                            GitHub ↗

                        </a>


                    </div>


                </div>


            </div>


            {/* Bottom section */}

            <div className="

                mt-12

                flex

                flex-col

                gap-4

                border-t

                border-slate-200

                pt-6

                text-sm

                text-slate-400

                md:flex-row

                md:items-center

                md:justify-between

                dark:border-slate-800

            ">


                <p>

                    © {new Date().getFullYear()} Bhawana Yadav. All rights reserved.

                </p>


                <p>

                    Designed & built with care.

                </p>


            </div>


        </div>


    </footer>

);


}
