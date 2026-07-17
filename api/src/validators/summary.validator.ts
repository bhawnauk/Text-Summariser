import {
z
}
from "zod";


export const summarySchema =
z.object({

text:
z.string()
.min(
50,
"Text too short"
),


length:
z.enum([
"short",
"medium",
"long"
]),


tone:
z.enum([
"professional",
"casual",
"bullet"
])


});