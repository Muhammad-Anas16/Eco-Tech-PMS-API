import express from "express";
import cors from "cors";
import "dotenv/config";
import { auth } from "./src/utils/auth.js";
import { toNodeHandler } from "better-auth/node";
import loginRoute from "./src/routes/auth/loginRoute.js";
import registerRoute from "./src/routes/auth/registerRoute.js";
import userRoute from "./src/routes/user/userRoute.js";

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.LOCAL_IP_ADDRESS;

app.use(
  cors({
    origin: "http://localhost:5173", // Apne frontend ka URL daalo
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", loginRoute);
app.use("/api", registerRoute);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
