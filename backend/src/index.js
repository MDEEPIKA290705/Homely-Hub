import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import { router} from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

dotenv.config();

const app = express();

//express.json() middleware is used to parse incoming requests with JSON payloads

app.use(express.json({ limit: "100mb" }));

//urlencoded() middleware is used to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ limit: "100mb", extended: true }));



//cookie-parser middleware is used to parse cookies attached to the client request object
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))


const port = process.env.PORT || 5000;



//one test route
app.get("/",(req,res)=>{
    res.send("Homelyhub server is running");
})

app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip", tripRouter)
connectDB();


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});