import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/ToDoList');
const taskSchema = new Schema({
    title: String,
    dueDate: Date,
    priority: String,
    columnId: Number,
    description: String,
    filepath: [String]
})
const Task = mongoose.model('Task', taskSchema);

export default Task;
