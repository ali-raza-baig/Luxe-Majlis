import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import TextArea from "../components/forms/TextArea";
import ImageUpload from "../components/forms/Uploadimage";
import { FiPlus, FiTrash2, FiSave, FiImage, FiInfo, FiStar, FiHelpCircle, FiSearch } from "react-icons/fi";

const langField = {
    en: "",
    ar: "",
};

type OptionType = {
    label: string;
    value: string;
};

const initialForm = {
    title: { ...langField },
    des: { ...langField },

    // SEO FIELDS
    seoTitle: { ...langField },
    seoDescription: { ...langField },
    seoKeywords: "",

    futureImage: null as File | null,
    imageGallery: [] as File[],

    category: "",

    whatAre: {
        title: { ...langField },
        des: { ...langField },
    },

    qualities: {
        cards: [
            {
                title: { ...langField },
                des: { ...langField },
            },
        ],
    },

    faqs: [
        {
            question: { ...langField },
            answer: { ...langField },
        },
    ],
};

const AddProduct = () => {
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("editId");
    const [category, setCategory] = useState<OptionType[]>([])
    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");

    // ======================
    // FETCH SINGLE PRODUCT (EDIT MODE)
    // ======================
    useEffect(() => {
        if (!editId) return;

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/single-by-id/${editId}`
                );

                if (data.success) {
                    setForm({
                        ...initialForm,
                        ...data.product,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();
    }, [editId]);

    // ======================
    // HANDLE INPUT CHANGE
    // ======================

    const fetchCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/category/all`)
            if (data.success) {
                let category = data.categories.map((c: any) => ({
                    label: c.name,
                    value: c._id
                }))
                setCategory(category)
            }
        } catch (error) {
            console.log(`Error in fetch category`, error)
        }
    }


    // ======================
    // HANDLE INPUT CHANGE
    // ======================
    // const handleChange = (
    //     e: React.ChangeEvent<
    //         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    //     >
    // ) => {
    //     const { name, value } = e.target;

    //     setForm((prev: any) => {
    //         if (name.includes(".")) {
    //             const [field, lang] = name.split(".");

    //             return {
    //                 ...prev,
    //                 [field]: {
    //                     ...prev[field],
    //                     [lang]: value,
    //                 },
    //             };
    //         }

    //         return {
    //             ...prev,
    //             [name]: value,
    //         };
    //     });
    // };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev: any) => {
            // Handle nested paths like "whatAre.title.en" or "seoTitle.en"
            if (name.includes(".")) {
                const keys = name.split(".");

                // If it's a 2-level path (e.g., "title.en")
                if (keys.length === 2) {
                    const [field, lang] = keys;
                    return {
                        ...prev,
                        [field]: {
                            ...prev[field],
                            [lang]: value,
                        },
                    };
                }

                // If it's a 3-level path (e.g., "whatAre.title.en")
                if (keys.length === 3) {
                    const [parent, child, lang] = keys;
                    return {
                        ...prev,
                        [parent]: {
                            ...prev[parent],
                            [child]: {
                                ...prev[parent]?.[child],
                                [lang]: value,
                            },
                        },
                    };
                }
            }

            // Handle flat fields
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // ======================
    // HANDLE IMAGE CHANGE
    // ======================
    const handleImageChange = (
        name: string,
        value: File | File[] | null
    ) => {
        setForm((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================
    // QUALITY CARDS
    // ======================
    const addQualityCard = () => {
        setForm((prev: any) => ({
            ...prev,
            qualities: {
                ...prev.qualities,
                cards: [
                    ...prev.qualities.cards,
                    {
                        title: { ...langField },
                        des: { ...langField },
                    },
                ],
            },
        }));
    };

    const removeQualityCard = (index: number) => {
        setForm((prev: any) => ({
            ...prev,
            qualities: {
                ...prev.qualities,
                cards: prev.qualities.cards.filter((_: any, i: number) => i !== index),
            },
        }));
    };

    const handleQualityCardChange = (index: number, field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang?: string) => {
        const { value } = e.target;

        setForm((prev: any) => {
            const updatedCards = [...prev.qualities.cards];

            if (lang && (field === "title" || field === "des")) {
                updatedCards[index] = {
                    ...updatedCards[index],
                    [field]: {
                        ...updatedCards[index][field],
                        [lang]: value,
                    },
                };
            } else {
                // This else block might cause issues if field is not title or des
                updatedCards[index] = {
                    ...updatedCards[index],
                    [field]: value,
                };
            }

            return {
                ...prev,
                qualities: {
                    ...prev.qualities,
                    cards: updatedCards,
                },
            };
        });
    };

    // ======================
    // FAQS
    // ======================
    const addFaq = () => {
        setForm((prev: any) => ({
            ...prev,
            faqs: [...prev.faqs, { question: langField, answer: langField }],
        }));
    };

    const removeFaq = (index: number) => {
        setForm((prev: any) => ({
            ...prev,
            faqs: prev.faqs.filter((_: any, i: number) => i !== index),
        }));
    };

    const handleFaqChange = (index: number, field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: string) => {
        const { value } = e.target;

        setForm((prev: any) => {
            const updatedFaqs = [...prev.faqs];
            updatedFaqs[index] = {
                ...updatedFaqs[index],
                [field]: {
                    ...updatedFaqs[index][field],
                    [lang]: value,
                },
            };

            return {
                ...prev,
                faqs: updatedFaqs,
            };
        });
    };


    // ======================
    // SUBMIT
    // ======================
    const handleSubmit = async () => {
        setLoading(true);

        // Create FormData object
        const formData = new FormData();

        // Append text fields (stringify nested objects)
        formData.append('title', JSON.stringify(form.title));
        formData.append('des', JSON.stringify(form.des));
        formData.append('category', form.category);
        formData.append('seoTitle', JSON.stringify(form.seoTitle));
        formData.append('seoDescription', JSON.stringify(form.seoDescription));
        formData.append('seoKeywords', form.seoKeywords);
        formData.append('whatAre', JSON.stringify(form.whatAre));
        formData.append('qualities', JSON.stringify(form.qualities));
        formData.append('faqs', JSON.stringify(form.faqs));

        if (form.futureImage instanceof File) {
            formData.append(
                "futureImage",
                form.futureImage
            );
        }

        if (form.imageGallery.length > 0) {
            form.imageGallery.forEach((file) => {
                // if (file instanceof File) {
                formData.append(
                    "imageGallery",
                    file
                );
                // }
            });
        }

        let res;
        try {
            if (editId) {
                res = await axios.put(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/update/${editId}`,
                    formData
                );
            } else {
                res = await axios.post(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/create`,
                    formData
                );
            }

            alert("Saved successfully");
            if (!editId) {
                setForm(initialForm);
            }
        } catch (err) {
            console.log(err);
            alert("Error saving product");
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "basic", label: "Basic Info", icon: FiInfo },
        { id: "images", label: "Images", icon: FiImage },
        { id: "qualities", label: "Qualities", icon: FiStar },
        { id: "faqs", label: "FAQs", icon: FiHelpCircle },
        { id: "seo", label: "SEO", icon: FiSearch },
    ];

    useEffect(() => {
        fetchCategory()
    }, [])



    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {editId ? "Edit Product" : "Add Product"}
                    </h1>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-deep-walnut text-white px-6 py-2 rounded-lg hover:bg-deep-walnut/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        <FiSave size={18} />
                        {loading ? "Saving..." : editId ? "Update Product" : "Save Product"}
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 pb-4 px-1 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? "border-b-2 border-deep-walnut text-royal-gold"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Tab */}
                        {activeTab === "basic" && (
                            <>
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Title</h3>
                                    <div className="space-y-4">
                                        <Input
                                            label="Product Name (English)"
                                            name="title.en"
                                            value={form.title.en}
                                            handleChange={handleChange}
                                            placeHolder="Enter product name in English"
                                        />
                                        <Input
                                            label="Product Name (Arabic)"
                                            name="title.ar"
                                            value={form.title.ar}
                                            handleChange={handleChange}
                                            placeHolder="Enter product name in Arabic"
                                        />

                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Descriptions</h3>
                                    <div className="space-y-4">
                                        <TextArea
                                            label="Full Description (English)"
                                            name="des.en"
                                            value={form.des.en}
                                            handleChange={handleChange}
                                            placeHolder="Detailed description in English"
                                            rows={6}
                                        />
                                        <TextArea
                                            label="Full Description (Arabic)"
                                            name="des.ar"
                                            value={form.des.ar}
                                            handleChange={handleChange}
                                            placeHolder="Detailed description in Arabic"
                                            rows={6}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Category</h3>
                                    <Select
                                        label="Select Category"
                                        name="category"
                                        value={form.category}
                                        handleChange={handleChange}
                                        options={category}
                                        placeHolder="Choose a category"
                                    />
                                </div>

                                {/* What Are Section */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">What Are Section</h3>
                                    <div className="space-y-4">
                                        <Input
                                            label="Section Title (English)"
                                            name="whatAre.title.en"
                                            value={form.whatAre.title.en}
                                            handleChange={handleChange}
                                            placeHolder="e.g., What are Smartwatches?"
                                        />
                                        <Input
                                            label="Section Title (Arabic)"
                                            name="whatAre.title.ar"
                                            value={form.whatAre.title.ar}
                                            handleChange={handleChange}
                                            placeHolder="Section title in Arabic"
                                        />
                                        <TextArea
                                            label="Section Description (English)"
                                            name="whatAre.des.en"
                                            value={form.whatAre.des.en}
                                            handleChange={handleChange}
                                            placeHolder="Describe what this product is in English"
                                            rows={4}
                                        />
                                        <TextArea
                                            label="Section Description (Arabic)"
                                            name="whatAre.des.ar"
                                            value={form.whatAre.des.ar}
                                            handleChange={handleChange}
                                            placeHolder="Describe what this product is in Arabic"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Images Tab */}
                        {activeTab === "images" && (
                            <>
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Featured Image</h3>
                                    <ImageUpload
                                        label="Main Product Image"
                                        name="futureImage"
                                        value={form.futureImage}
                                        handleChange={handleImageChange}
                                        multiple={false}
                                    />
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Gallery Images</h3>
                                    <ImageUpload
                                        label="Additional Images"
                                        name="imageGallery"
                                        value={form.imageGallery}
                                        handleChange={handleImageChange}
                                        multiple={true}
                                        maxFiles={10}
                                    />
                                </div>
                            </>
                        )}

                        {/* Qualities Tab */}
                        {activeTab === "qualities" && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Qualities Section</h3>
                                    <button
                                        type="button"
                                        onClick={addQualityCard}
                                        className="bg-deep-walnut text-white px-3 py-1.5 rounded-lg text-sm hover:bg-deep-walnut/90 transition-colors flex items-center gap-1"
                                    >
                                        <FiPlus size={14} />
                                        Add Card
                                    </button>
                                </div>


                                {form.qualities.cards.map((card: any, index: number) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 relative hover:shadow-sm transition-shadow">
                                        <button
                                            type="button"
                                            onClick={() => removeQualityCard(index)}
                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                        <div className="space-y-3 pr-6">

                                            <Input
                                                label="Title (English)"
                                                name={`quality-title-en-${index}`}
                                                value={card.title.en}
                                                handleChange={(e) => handleQualityCardChange(index, "title", e, "en")}
                                                placeHolder="Card title in English"
                                            />
                                            <Input
                                                label="Title (Arabic)"
                                                name={`quality-title-ar-${index}`}
                                                value={card.title.ar}
                                                handleChange={(e) => handleQualityCardChange(index, "title", e, "ar")}
                                                placeHolder="Card title in Arabic"
                                            />
                                            <TextArea
                                                label="Description (English)"
                                                name={`quality-desc-en-${index}`}
                                                value={card.des.en}
                                                handleChange={(e) => handleQualityCardChange(index, "des", e, "en")}
                                                placeHolder="Card description in English"
                                                rows={2}
                                            />
                                            <TextArea
                                                label="Description (Arabic)"
                                                name={`quality-desc-ar-${index}`}
                                                value={card.des.ar}
                                                handleChange={(e) => handleQualityCardChange(index, "des", e, "ar")}
                                                placeHolder="Card description in Arabic"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* FAQs Tab */}
                        {activeTab === "faqs" && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">FAQs</h3>
                                    <button
                                        type="button"
                                        onClick={addFaq}
                                        className="bg-deep-walnut text-white px-3 py-1.5 rounded-lg text-sm hover:bg-deep-walnut/90 transition-colors flex items-center gap-1"
                                    >
                                        <FiPlus size={14} />
                                        Add FAQ
                                    </button>
                                </div>

                                {form.faqs.map((faq: any, index: number) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 relative hover:shadow-sm transition-shadow">
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                        <div className="space-y-3 pr-6">
                                            <Input
                                                label={`Question (English)`}
                                                name={`faq-question-en-${index}`}
                                                value={faq.question.en}
                                                handleChange={(e) => handleFaqChange(index, "question", e, "en")}
                                                placeHolder="Enter question in English"
                                            />
                                            <Input
                                                label={`Question (Arabic)`}
                                                name={`faq-question-ar-${index}`}
                                                value={faq.question.ar}
                                                handleChange={(e) => handleFaqChange(index, "question", e, "ar")}
                                                placeHolder="Enter question in Arabic"
                                            />
                                            <TextArea
                                                label={`Answer (English)`}
                                                name={`faq-answer-en-${index}`}
                                                value={faq.answer.en}
                                                handleChange={(e) => handleFaqChange(index, "answer", e, "en")}
                                                placeHolder="Enter answer in English"
                                                rows={3}
                                            />
                                            <TextArea
                                                label={`Answer (Arabic)`}
                                                name={`faq-answer-ar-${index}`}
                                                value={faq.answer.ar}
                                                handleChange={(e) => handleFaqChange(index, "answer", e, "ar")}
                                                placeHolder="Enter answer in Arabic"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SEO Tab */}
                        {activeTab === "seo" && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">SEO Settings</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="SEO Title (English)"
                                        name="seoTitle.en"
                                        value={form.seoTitle.en}
                                        handleChange={handleChange}
                                        placeHolder="SEO title for search engines (English)"
                                    />
                                    <Input
                                        label="SEO Title (Arabic)"
                                        name="seoTitle.ar"
                                        value={form.seoTitle.ar}
                                        handleChange={handleChange}
                                        placeHolder="SEO title for search engines (Arabic)"
                                    />
                                    <TextArea
                                        label="SEO Description (English)"
                                        name="seoDescription.en"
                                        value={form.seoDescription.en}
                                        handleChange={handleChange}
                                        placeHolder="Meta description for SEO (English)"
                                        rows={3}
                                    />
                                    <TextArea
                                        label="SEO Description (Arabic)"
                                        name="seoDescription.ar"
                                        value={form.seoDescription.ar}
                                        handleChange={handleChange}
                                        placeHolder="Meta description for SEO (Arabic)"
                                        rows={3}
                                    />
                                    <Input
                                        label="SEO Keywords"
                                        name="seoKeywords"
                                        value={form.seoKeywords}
                                        handleChange={handleChange}
                                        placeHolder="product, ecommerce, shop (comma separated)"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Preview & Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Preview</h3>
                            <div className="space-y-4">
                                {form.futureImage && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2 font-medium">Featured Image</p>
                                        {form.futureImage && (
                                            <img
                                                src={form.futureImage instanceof File ? URL.createObjectURL(form.futureImage) : `${import.meta.env.VITE_API_BACKEND_URL}/images/${form.futureImage}`}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg border border-gray-200"
                                            />
                                        )}
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-3">
                                    <p className="text-sm text-gray-600 mb-1">Title</p>
                                    <p className="font-medium text-gray-900">{form.title.en || "Not set"}</p>
                                    {form.title.ar && <p className="text-sm text-gray-500 mt-1">{form.title.ar}</p>}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Category</p>
                                    <p className="text-sm text-gray-900">{form.category || "Not selected"}</p>
                                </div>


                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Media</p>
                                    <p className="text-sm">📷 Featured: {form.futureImage ? "✓" : "✗"}</p>
                                    <p className="text-sm">🖼️ Gallery: {form.imageGallery.length} images</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Content</p>
                                    <p className="text-sm">❓ FAQs: {form.faqs.length} items</p>
                                    <p className="text-sm">⭐ Quality Cards: {form.qualities.cards.length} cards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;