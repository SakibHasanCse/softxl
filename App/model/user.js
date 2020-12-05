import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name'],
        trim: true,
        min: [2, 'Name can not be less then 2 characters'],
        maxlength: [50, 'Name can not be more then 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        trim: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Pleass add valid email']
    },
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'librarian']
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

const user = mongoose.model('User', userSchema)
export default user