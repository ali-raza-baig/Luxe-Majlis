import mongoose from "mongoose";

const lanField = {
    en: {
        type: String
    },
    ar: {
        type: String
    }
}

const faqShema = mongoose.Schema({
    question: lanField,
    answare: lanField
});

const heroSection = mongoose.Schema({
    img: String,
    title: lanField,
    des: lanField
});

const whyChoice = mongoose.Schema({
    icon: String,
    title: lanField,
    des: lanField
});

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    hero: heroSection,
    faq: [faqShema],
    whyChoice: {
        title: lanField,
        cards: [whyChoice]
    },
    seo: {
        metaTitle: lanField,
        metaDes: lanField,
        metaKeywords: [String],
    }
}, { timestamps: true })

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;
