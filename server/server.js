import express from 'express'
import cors from 'cors';
import Task from '../database/database.js';
import multer from 'multer';
import InitializeDB from '../database/initializeDB.js';


const app = express()
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    cb(null, file.originalname + '-' + Date.now());
    },
  });
  
  const upload = multer({ storage: storage });

// добавление тестовых данных в бд
// InitializeDB();

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

app.post('/files/upload', upload.single('files'), (req, res) => {
    const filePath = req.file.path;
    res.json(filePath);
});

app.post('/tasks/add', async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            dueDate: req.body.date,
            priority: req.body.priority,
            // status: req.body.status,
            columnId: req.body.columnId,
            description: req.body.taskDescription,
            filepath: req.body.uploadFile
        });
        res.json({ message: "Задача успешно добавлена!", task: newTask });
    } catch (error) {
        console.log(error);
        res.json({ message: "Не удалось добавить задачу" });

    }
});

app.patch('/tasks/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    task.title = req.body.title || task.title;
    task.dueDate = req.body.date || task.dueDate;
    task.priority = req.body.priority || task.priority;
    task.columnId = req.body.columnId || task.columnId;
    task.description = req.body.taskDescription || task.description;

    if (req.body.uploadFile) {
      const newFiles = req.body.uploadFile.filter(file => !task.filepath.includes(file));
      task.filepath = [...task.filepath, ...newFiles];
    }

    await task.save();

    res.json({ message: "Задача обновлена!", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить задачу" });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});