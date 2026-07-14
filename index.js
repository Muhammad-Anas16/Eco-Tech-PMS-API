import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;
const host = process.env.LOCAL_IP_ADDRESS;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
