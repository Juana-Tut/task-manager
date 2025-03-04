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
    res.redirect("/");// Reload page to reflect changes
});

router.post("/toggle-task/:id",(req,res) => {
    const taskId = parseInt(req.params.id); // Get ID from URL
    const task = tasks.find(t => t.id === taskId); // Find task

    if(task){
        task.completed = !task.completed;// Toggle completed status
    }
    res.redirect("/");// Reload page to reflect changes
})
export default router;