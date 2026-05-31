import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";

const langField = {
    en: "",
    ar: "",
};

const initialForm = {
    title: { ...langField },
    slug: "",
    shortDescription: { ...langField },
    description: { ...langField },

    // SEO FIELDS
    seoTitle: { ...langField },
    seoDescription: { ...langField },
    seoKeywords: "",

    featuredImage: "",
    imageGallery: [] as string[],

    category: "",

    whatAre: {
        title: { ...langField },
        description: { ...langField },
    },

    qualities: {
        title: { ...langField },
        cards: [
            {
                icon: "",
                title: { ...langField },
                description: { ...langField },
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

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    // ======================
    // FETCH SINGLE PRODUCT (EDIT MODE)
    // ======================
    useEffect(() => {
        if (!editId) return;

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/${editId}`
                );

                if (data.success) {
                    setForm(data.product);
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

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev: any) => {
            // CASE 1: nested field (title.en)
            if (name.includes(".")) {
                const [field, lang] = name.split(".");

                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [lang]: value,
                    },
                };
            }

            // CASE 2: normal field (category, slug, etc.)
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // ======================
    // ADD FAQ
    // ======================
    const addFaq = () => {
        setForm((prev: any) => ({
            ...prev,
            faqs: [...prev.faqs, { question: langField, answer: langField }],
        }));
    };

    // ======================
    // SUBMIT
    // ======================
    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (editId) {
                await axios.put(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/${editId}`,
                    form
                );
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_BACKEND_URL}/api/product/create`,
                    form
                );
            }
            alert("Saved successfully");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>

            <h1 className="text-2xl font-bold">
                {editId ? "Edit Product" : "Add Product"}
            </h1>

            <div className="grid grid-cols-12">
                <div className="col-span-7">
                    <div className="mt-4">
                        <h4 className="text-lg lg:text-xl font-playfair border-b inline  px-2">Basic Information</h4>
                        <div className="mt-6">
                            <Input label="Product Name " name="title.en" value={form.title.en} handleChange={handleChange} />

                            <Select
                                label="Category"
                                name="category"
                                value={form.category}
                                handleChange={handleChange}
                                options={[
                                    { label: "Electronics", value: "electronics" },
                                    { label: "Fashion", value: "fashion" },
                                ]}
                            />

                        </div>
                    </div>
                </div>
                <div className="col-span-5">

                </div>
            </div>


        </Layout>
    );
};

export default AddProduct;