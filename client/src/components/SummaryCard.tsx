interface Props{

summary:string;

}


export default function SummaryCard({
summary
}:Props){


function copy(){

navigator.clipboard.writeText(summary);

}


function download(){

const blob =
new Blob(
[summary],
{
type:"text/plain"
}
);


const url =
URL.createObjectURL(blob);


const a=document.createElement("a");

a.href=url;

a.download="summary.txt";

a.click();

}



return(

<div className="
mt-8
rounded-3xl
bg-white
shadow-xl
border
p-8
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

Summary

</h2>


<div className="
flex
gap-3
">


<button

onClick={copy}

className="
px-4
py-2
rounded-lg
bg-slate-100
hover:bg-slate-200
"

>

Copy

</button>



<button

onClick={download}

className="
px-4
py-2
rounded-lg
bg-blue-600
text-white
"

>

Download

</button>


</div>


</div>


<p className="
leading-relaxed
text-slate-700
">

{summary}

</p>


</div>


)

}