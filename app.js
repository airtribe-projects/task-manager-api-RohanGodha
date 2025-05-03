const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${PORT}`);
});

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const error = validateTaskInput(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const { title, description, completed, priority } = req.body;

    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed,
        priority,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const error = validateTaskInput(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const { title, description, completed, priority } = req.body;

    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;
    task.priority = priority;

    res.json(task);
});



app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.get('/tasks', (req, res) => {
    let result = tasks;

    if (req.query.completed) {
        const completed = req.query.completed === 'true';
        result = result.filter(task => task.completed === completed);
    }

    if (req.query.sortBy === 'createdAt') {
        result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.json(result);
});

app.get('/tasks/priority/:level', (req, res) => {
    const { level } = req.params;
    const validPriorities = ['low', 'medium', 'high'];

    if (!validPriorities.includes(level)) {
        return res.status(400).json({ error: 'Invalid priority level' });
    }

    const filteredTasks = tasks.filter(task => task.priority === level);
    res.json(filteredTasks);
});


function validateTaskInput(data) {
    const { title, description, completed, priority } = data;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return 'Title is required and must be a non-empty string';
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return 'Description is required and must be a non-empty string';
    }

    if (typeof completed !== 'boolean') {
        return 'Completed must be a boolean value';
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
        return 'Priority must be low, medium, or high';
    }

    return null;
}


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.get('/', (req, res) => {
    res.send('Welcome to the Rohan Godha: Task Manager API!');
});



module.exports = app;