import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        console.log(`Error in hashing password : ${error}`)
        next(error);
    }
})

userSchema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

const userModel = mongoose.model('Users', userSchema);
export default userModel;
