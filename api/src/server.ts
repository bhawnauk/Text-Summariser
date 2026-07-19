import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = 5050;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
});

server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});