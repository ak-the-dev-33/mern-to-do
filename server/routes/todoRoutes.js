const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Create a new to-do item (requires authentication)
router.post('/', authMiddleware, async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = new Todo({
            task,
            userId: req.user.id,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all to-do items for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a to-do item
router.put('/:id', authMiddleware, async (req, res) => {
    const { task } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { task }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a to-do item
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
