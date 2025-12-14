import express from "express"; // ES6 import
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello ES6 modules with TypeScript!");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
