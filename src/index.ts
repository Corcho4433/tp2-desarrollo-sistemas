import express from "express";

import { authRouter } from "./routers/authRouter.js";
import { menuRouter } from "./routers/menuRouter.js";
import { tableRouter } from "./routers/tableRouter.js";
import { deliveryRouter } from "./routers/deliveryRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/menu", menuRouter);
app.use("/table", tableRouter);
app.use("/delivery", deliveryRouter);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
