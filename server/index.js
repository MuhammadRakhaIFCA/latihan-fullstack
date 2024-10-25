import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"

const app = express()

const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
}

app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Credentials", true)
    next()
})
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/posts", postRoutes)
app.use("/users", userRoutes)
app.use("/comments", commentRoutes)
app.use("/", followRoutes)



app.listen(3003, "127.0.0.1", () => {
    console.log("app started");
})