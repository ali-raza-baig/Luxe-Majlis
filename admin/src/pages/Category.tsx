import { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/tables/Table'
import Input from '../components/forms/Input'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const Category = () => {

    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState<any[]>([])


    const handleChange = (e: any) => {
        setSearch(e?.target.value)
    }

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/category/all`)
            if (data.success) {
                setCategories(data.categories);
            };
        } catch (error) {
            console.log(error)
        }
    }

    const filteredCategories = search
        ? categories.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        : categories;

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <Layout>
            <div className='flex items-center justify-between pb-2'>
                <h2 className="py-2 text-xl md:text-2xl font-semibold">All Categories</h2>
                <Input type='text' name='search' value={search} handleChange={handleChange} placeHolder='Search Categories' Icon={BiSearch} className='w-10' />
            </div>
            <div>
                <Table
                    header={[
                        {
                            key: "hero.img", label: "Image", render: (_, row) => (
                                <img
                                    src={`${import.meta.env.VITE_API_BACKEND_URL}/images/${row.hero?.img}`}
                                    className="w-20 h-20 object-contain"
                                />
                            )
                        },
                        { key: "name", label: "Name" },
                        { key: "slug", label: "Slug" },
                        // { key: "faqs", label: "FAQs" },
                        {
                            key: "createdAt", label: "Created", render: (value) => (
                                <span>
                                    {new Date(value).toLocaleDateString()}
                                </span>
                            )
                        },
                    ]}
                    body={filteredCategories}
                />
            </div>
        </Layout>
    )
}

export default Category