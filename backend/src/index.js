const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {connectDb} = require("./db/mongoDb");
const eventRoutes = require("./routes/event.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

app.use("/api/events",eventRoutes);

const PORT = process.env.PORT || 5000;
connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    })
})

