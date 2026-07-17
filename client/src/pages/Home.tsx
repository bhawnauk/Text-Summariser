import {
useState
} from "react";


import UploadBox from "../components/UploadBox";
import LoadingCard from "../components/LoadingCard";
import SummaryCard from "../components/SummaryCard";


const MAX_WORDS=2000;



export default function Home(){


const [text,setText]=useState("");

const [file,setFile]=useState<File|null>(null);

const [loading,setLoading]=useState(false);

const [summary,setSummary]=useState("");



const words=text
.trim()
.split(/\s+/)
.filter(Boolean)
.length;



function handleText(
e:React.ChangeEvent<HTMLTextAreaElement>
){

const value=e.target.value;


const count=value
.trim()
.split(/\s+/)
.filter(Boolean)
.length;


if(count<=MAX_WORDS){

setText(value);

}

}



function generate(){


setLoading(true);


setTimeout(()=>{


setSummary(
`
This is a demo AI summary.

Your backend API will replace this
with a real OpenAI generated summary.

Important points will appear here.
`
);


setLoading(false);


},2000);


}



return(

<div
className="
min-h-screen
bg-gradient-to-br
from-slate-50
via-white
to-blue-50
dark:from-slate-950
dark:via-slate-900
dark:to-slate-950
"
>


<div
className="
max-w-5xl
mx-auto
px-6
py-16
"
>


<div
className="
text-center
mb-12
"
>


<h1
className="
text-5xl
font-bold
dark:text-white
"
>

AI Text Summariser

</h1>


<p
className="
mt-4
text-lg
text-slate-600
dark:text-slate-300
"
>

Summarise articles, reports and transcripts instantly.

</p>


</div>



<div
className="
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-8
"
>


<textarea

value={text}

onChange={handleText}

placeholder="
Paste your article here...
"

className="
w-full
h-72
rounded-2xl
border
p-5
outline-none
focus:ring-2
focus:ring-blue-500
dark:bg-slate-800
dark:text-white
"

/>



<div
className="
flex
justify-between
mt-3
text-sm
"
>


<span>

Maximum {MAX_WORDS} words

</span>


<span>

{words}/{MAX_WORDS}

</span>


</div>



<UploadBox

onUpload={(file)=>setFile(file)}

/>



{
file &&
<p className="
mt-3
text-green-600
">

Selected:
{file.name}

</p>

}



<div
className="
grid
md:grid-cols-2
gap-5
mt-8
"
>


<select
className="
border
rounded-xl
p-3
dark:bg-slate-800
dark:text-white
"
>

<option>
Short
</option>

<option>
Medium
</option>

<option>
Long
</option>


</select>



<select
className="
border
rounded-xl
p-3
dark:bg-slate-800
dark:text-white
"
>

<option>
Professional
</option>

<option>
Casual
</option>

<option>
Bullet Points
</option>


</select>


</div>



<button

onClick={generate}

className="
mt-8
w-full
py-4
rounded-2xl
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
font-semibold
hover:scale-[1.02]
transition
"

>

Generate Summary

</button>



{
loading &&
<LoadingCard/>
}



{
summary &&
<SummaryCard summary={summary}/>
}



</div>


</div>


</div>

)

}