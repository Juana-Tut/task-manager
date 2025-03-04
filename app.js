import express from "express";
import path from "path";

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "views"))

const loggingMiddleware= (req, res,next) => {
    const timestamp = new Date().toISOString;
    console.log(`${timestamp}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware)
app.use((req,res) => {
    res.status(404).send("404. Page Not Found. \n");
})
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}/`)
})