import express from "express";
import "dotenv/config";
import router from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Enabling Cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes :-
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello ES6 modules with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
