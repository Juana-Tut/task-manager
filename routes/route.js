import express from "express";
import path from "path";
const router = express.Router();
import { query } from '../config/db.js';

// Display all tasks
router.get("/", async (req, res) => {
    try {
        const result = await query("SELECT * FROM tasks");
        res.render("index", { tasks: result.rows });
    } catch (err) {
        res.status(500).send("Error retrieving tasks");
    }
});

// Add a new task
router.post("/add-task", async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).send("Task title is required.\n");
    }
    try {
        await query("INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)", [title, description, false]);
        res.redirect("/"); // Reload page to reflect changes
    } catch (err) {
        res.status(500).send("Error adding task");
    }
});

// Toggle task completion
router.post("/toggle-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id); // Get ID from URL
    try {
        const result = await query("SELECT completed FROM tasks WHERE id = $1", [taskId]);
        if (result.rows.length > 0) {
            const completed = !result.rows[0].completed;
            await query("UPDATE tasks SET completed = $1 WHERE id = $2", [completed, taskId]);
        }
        res.redirect("/"); // Reload page to reflect changes
    } catch (err) {
        res.status(500).send("Error toggling task completion");
    }
});

// Delete task
router.post("/delete-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id); // Get ID from URL
    try {
        await query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.redirect("/"); // Reload page to reflect changes
    } catch (err) {
        res.status(500).send("Error deleting task");
    }
});

export default router;