import express from "express";
import path from "path";
const router = express.Router();

//In-memory storage for tasks
let tasks = [];
let idCounter = 1;

//Display all tasks
router.get("/",(req,res) =>{
    res.render("index",{tasks})
});

router.post("/add-task",(req,res) => {
    const{title, description} = req.body;
    if (!title){
        return res.status(400).send("Task title is required. \n")
    }
    tasks.push({id:idCounter++,title, description, completed: false});
    res.redirect("/");
})
export default router;