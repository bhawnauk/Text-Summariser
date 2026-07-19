import { Link, useLocation } from "react-router-dom";

export default function Navbar() {


const location = useLocation();


const isActive = (path: string) => {

    return location.pathname === path;

};


return (

    <nav className="

        mx-auto

        flex

        max-w-7xl

        items-center

        justify-between

        px-6

        py-6

    ">


        {/* Logo */}

        <Link

            to="/"

            className="flex items-center gap-3"

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

                text-slate-950

                dark:text-white

            ">

                Text Summariser

            </span>


        </Link>


        {/* Desktop Navigation */}

        <div className="

            hidden

            items-center

            gap-8

            text-sm

            md:flex

        ">


            <Link

                to="/"

                className={`

                    transition

                    ${

                        isActive("/")

                            ? "text-slate-950 dark:text-white"

                            : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"

                    }

                `}

            >

                Product

            </Link>


            <Link

                to="/how-it-works"

                className={`

                    transition

                    ${

                        isActive("/how-it-works")

                            ? "text-slate-950 dark:text-white"

                            : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"

                    }

                `}

            >

                How it works

            </Link>


            <Link

                to="/about"

                className={`

                    transition

                    ${

                        isActive("/about")

                            ? "text-slate-950 dark:text-white"

                            : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"

                    }

                `}

            >

                About

            </Link>


        </div>


        {/* CTA */}

      <button
    onClick={() => {
        window.location.href = "/";
    }}
    className="..."
>
    Try it free
</button>


    </nav>

);

}
