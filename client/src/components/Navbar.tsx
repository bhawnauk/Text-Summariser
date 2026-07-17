import {
Link
} from "react-router-dom";

import ThemeToggle from "./ThemeToggle";


export default function Navbar(){

return(

<nav
className="
sticky
top-0
z-50
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
border-b
border-slate-200
dark:border-slate-700
">


<div
className="
max-w-6xl
mx-auto
px-6
py-4
flex
items-center
justify-between
">


<div>

<Link
to="/"
className="
text-2xl
font-bold
bg-gradient-to-r
from-blue-600
to-indigo-600
bg-clip-text
text-transparent
"
>

SummarAI

</Link>


</div>



<div
className="
flex
items-center
gap-6
"
>


<Link

className="
text-slate-600
dark:text-slate-200
hover:text-blue-600
"

to="/"
>

Home

</Link>



<Link

className="
text-slate-600
dark:text-slate-200
hover:text-blue-600
"

to="/history"
>

History

</Link>



<Link

className="
text-slate-600
dark:text-slate-200
hover:text-blue-600
"

to="/settings"
>

Settings

</Link>



<ThemeToggle/>


</div>


</div>


</nav>

)

}