import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import summaryRoutes from "./routes/summary.routes";

import {errorHandler} from "./middleware/error.middleware";

import limiter from "./middleware/limiter.middleware";


const app = express();


app.use(helmet());

app.use(
cors({
origin:"http://localhost:5173"
})
);


app.use(express.json());


app.use(morgan("dev"));


app.use(limiter);



app.get("/",(_,res)=>{

res.json({
message:"SummarAI API running"
});

});


app.use(
"/api/summarise",
summaryRoutes
);



app.use(errorHandler);



export default app;