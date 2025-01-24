import express from 'express'
import cors from 'cors';
import Task from '../database/database.js';
import multer from 'multer';
import InitializeDB from '../database/initializeDB.js';

const upload = multer({ dest: "uploads/" })

const app = express()
const port = 3000;

// добавление тестовых данных в бд
// InitializeDB();

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

app.post('/files/upload', upload.single('files'), (req, res) => {
    res.json(req.file.path);

});

app.post('/tasks/add', async (req, res) => {
    const newTask = await Task.create({
        title: req.body.title,
        dueDate: req.body.date,
        priority: req.body.priority,
        status: req.body.status,
        description: req.body.taskDescription,
        filepath: req.body.uploadFile
    });
    res.json({ message: "Task created successfully", task: newTask });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});