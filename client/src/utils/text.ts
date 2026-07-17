export function countWords(
text:string
){

return text
.trim()
.split(/\s+/)
.filter(Boolean)
.length;

}