import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

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



app.listen(3003, "127.0.0.1", () => {
    console.log("app started");
})