import express from "express";
import path from "path";
const router = express.Router();
import { query } from '../config/db.js';

// Display all tasks
router.get("/", async (req, res) => {
    try {
        const result = await query("SELECT * FROM tasks");
        res.render("index", { tasks: result.rows, errors: {}, title: '', description: '' });
    } catch (err) {
        res.status(500).send("Error retrieving tasks");
    }
});

// Add a new task
router.post("/add-task", async (req, res) => {
    const { title, description } = req.body;
    let errors = {};

    if (!title || title.length < 3 || title.length > 100) {
        errors.title = 'Title must be between 3 and 100 characters.';
    }

    if (description && description.length > 500) {
        errors.description = 'Description cannot exceed 500 characters.';
    }

    if (Object.keys(errors).length > 0) {
        try {
            const result = await query("SELECT * FROM tasks");
            return res.render("index", { 
                tasks: result.rows, 
                errors: errors, 
                title: title || '', 
                description: description || '' 
            });
        } catch (err) {
            return res.status(500).send("Error retrieving tasks");
        }
    }

    try {
        await query("INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)", [title, description, false]);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error adding task");
    }
});

// Toggle task completion
router.post("/toggle-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    try {
        const result = await query("SELECT completed FROM tasks WHERE id = $1", [taskId]);
        if (result.rows.length > 0) {
            const completed = !result.rows[0].completed;
            await query("UPDATE tasks SET completed = $1 WHERE id = $2", [completed, taskId]);
        }
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error toggling task completion");
    }
});

// Delete task
router.post("/delete-task/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    try {
        await query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error deleting task");
    }
});

export default router;