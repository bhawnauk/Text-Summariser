import {
useDropzone
} from "react-dropzone";


interface Props{

onUpload:(file:File)=>void;

}



export default function UploadBox({
onUpload
}:Props){


const {
getRootProps,
getInputProps,
isDragActive
}=useDropzone({

multiple:false,

accept:{

"text/plain":[
".txt"
],

"application/pdf":[
".pdf"
],

"application/vnd.openxmlformats-officedocument.wordprocessingml.document":[
".docx"
]

},


onDrop(files){

if(files.length){

onUpload(files[0]);

}

}


});



return(

<div

{...getRootProps()}

className={`
mt-6
rounded-2xl
border-2
border-dashed
p-8
text-center
cursor-pointer
transition

${
isDragActive
?
"border-blue-500 bg-blue-50"
:
"border-slate-300 hover:border-blue-500"
}

`}

>


<input {...getInputProps()}/>


<h3
className="
font-semibold
text-slate-700
dark:text-white
"
>

{
isDragActive
?
"Drop file here"
:
"Upload a document"
}

</h3>



<p
className="
text-sm
mt-2
text-slate-500
"
>

PDF • DOCX • TXT

</p>


</div>


)

}