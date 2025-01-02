import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

//route imports
import otpRoutes from "./src/routes/otpRoutes.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import contactRoutes from "./src/routes/contactRoutes.mjs";
import leaveRoutes from "./src/routes/leaveRoutes.mjs";
import overTimeRoutes from "./src/routes/overtimeRoutes.mjs";
import projectRoutes from "./src/routes/projectRoutes.mjs";
import holidayRoutes from "./src/routes/holidayRoutes.mjs";
import employeeRoutes from "./src/routes/employeeRoutes.mjs";
import clientRoutes from "./src/routes/clientRoutes.mjs";





// Middleware setup
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS



//routes
app.get("/", (req, res) => {
    res.send("hello")
})

//user Route

// API Routes
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/overtime", overTimeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/clients", clientRoutes);

//connect to DB
connectDb()
const PORT = process.env.PORT || 3000

app.use((err, req, res, next) => {


    res.status(err.statusCode || 500).json({
        message: err.status || "internal server error",
        error: err.message || "internal server error"

    })

})
app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})