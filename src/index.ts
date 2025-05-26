import express from "express";

import { authRouter } from "./routers/authRouter";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRouter);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
