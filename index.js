// CORS with credentials
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Apna frontend URL daalo
//     credentials: true,
//   }),
// );

// ****************************************************************
// ****************************************************************
// ****************************************************************

// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// const app = express();

// const port = process.env.PORT || 5000;
// const host = process.env.LOCAL_IP_ADDRESS;

// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, host, () => {
//   console.log(`Server running at http://${host}:${port}`);
// });

import cors from "cors";
import "dotenv/config";
import express from "express";
import { auth } from "./src/utils/auth.js";
import { toNodeHandler } from "better-auth/node";

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.LOCAL_IP_ADDRESS;

app.use(cors());

// Express v5 ke liye *splat use karo
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
