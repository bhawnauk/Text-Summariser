export default function LoadingCard() {


return (

    <div className="

        mt-8

        rounded-3xl

        border

        border-slate-200

        bg-white

        p-6

        dark:border-slate-800

        dark:bg-slate-950

    ">


        <div className="flex items-center gap-3">


            <div className="

                flex

                h-9

                w-9

                animate-pulse

                items-center

                justify-center

                rounded-xl

                bg-slate-950

                text-white

                dark:bg-white

                dark:text-slate-950

            ">

                ✦

            </div>


            <div>


                <p className="

                    text-sm

                    font-medium

                    text-slate-900

                    dark:text-white

                ">

                    Thinking through your text...

                </p>


                <p className="

                    mt-1

                    text-xs

                    text-slate-400

                ">

                    Finding the signal in the noise.

                </p>


            </div>


        </div>


        <div className="mt-6 space-y-3">


            <div className="

                h-3

                animate-pulse

                rounded-full

                bg-slate-100

                dark:bg-slate-800

            " />


            <div className="

                h-3

                w-5/6

                animate-pulse

                rounded-full

                bg-slate-100

                dark:bg-slate-800

            " />


            <div className="

                h-3

                w-4/6

                animate-pulse

                rounded-full

                bg-slate-100

                dark:bg-slate-800

            " />


        </div>


    </div>

);


}
