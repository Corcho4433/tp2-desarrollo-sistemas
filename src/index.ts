import express from "express";

import { adminRouter } from "./routers/adminRouter";
import { authRouter } from "./routers/authRouter";
import { menuRouter } from "./routers/menuRouter";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
