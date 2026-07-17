import {
Router
}
from "express";


import {
summarise
}
from "../controllers/summary.controller";


const router =
Router();


router.post(
"/",
summarise
);


export default router;