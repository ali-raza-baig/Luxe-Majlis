import mongoose from "mongoose";

const langField = {
    en: {
        type: String
    },
    ar: {
        type: String
    }
}

const faqSchema = mongoose.Schema({
    question: langField,
    answer: langField
});

const productSchema = mongoose.Schema({
    title: {
        type: langField,
        required: true
    },
    futureImage: {
        type: String,
        // required: true
    },
    imageGallery: [{
        type: String
    }],
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    des: {
        type: langField,
        required: true
    },
    whatAre: {
        title: langField,
        des: langField
    },
    qualities: {
        cards: [{
            title: langField,
            des: langField
        }]
    },
    faqs: [faqSchema]

}, { timestamps: true });

const product = mongoose.model('products', productSchema);

export default product;