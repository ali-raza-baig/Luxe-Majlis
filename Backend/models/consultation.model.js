import mongoose from 'mongoose'

const consultationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const consModel = mongoose.model('Consultation', consultationSchema);

export default consModel;