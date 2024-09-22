exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

exports.addTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new Todo({
            userId: req.userId,
            title,
            description
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
};
