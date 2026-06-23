import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        console.log(`Error in hashing password : ${error}`)
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

const userModel = mongoose.model('Users', userSchema);
export default userModel;
