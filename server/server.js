require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/authMiddleware')
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust the origin to match your client
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api/todos',authMiddleware, todoRoutes);

// Error handling for unhandled routes
app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
