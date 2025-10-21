import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters long"], maxlength: [50, "Name must be at most 50 characters long"] },
    email: { type: String, required: [true, "Email is required"], unique: true, match: [/.+\@.+\..+/, "Email is not valid"] },
    password: { type: String, required: [true, "Password is required"], select: false },
}, { timestamps: true });

const User = models.User || model('User', userSchema);

export default User;
