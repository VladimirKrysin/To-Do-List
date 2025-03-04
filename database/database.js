import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/ToDoList');
const ColumnSchema = new Schema({
    _id: Number,
    name: String,
    number: Number,
    children: [
        {
            number: Number,
            title: String,
            dueDate: Date,
            priority: String,
            columnId: Number,
            description: String,
            filepath: [String]
        }
    ]
})

export const Column = mongoose.model('Column', ColumnSchema);



const UserSchema = mongoose.Schema({
    username:String,
    password:String,
})
export const User = mongoose.model("User", UserSchema);
