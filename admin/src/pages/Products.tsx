import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/tables/Table'
import Input from '../components/forms/Input'
import { BiSearch } from 'react-icons/bi'
import Button from '../components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../context/ProductContext'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline, MdPreview } from 'react-icons/md'
import ModelBox from '../components/ModelBox'
import axios from 'axios'


const Products = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [openModel, setOpenModel] = useState(false)
    const [preview, setPreview] = useState('')
    const { products, loading, setProducts } = useProduct()


    const handleChange = (e: any) => {
        setSearch(e?.target.value)
    }


    const filteredProducts = search ? products.filter((item: any) => item.title.en.toLowerCase().includes(search.toLowerCase())) : products

    const handleDelete = async (row: any) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete?"
            );

            if (confirmDelete) {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/api/product/delete/${row._id}`)
                if (data.success) {
                    let newProducts = products.filter((item: any) => item._id !== row._id)
                    setProducts(newProducts);
                }
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleEdit = (row: any) => {
        navigate(`/new-product?editId=${row._id}`)
    }
    const handlePreview = (row: any) => {
        setOpenModel(true)
        setPreview(row.slug)
    }




    if (loading) return null;

    return (
        <Layout>
            <div className='flex items-center justify-between pb-2'>
                <h2 className="py-2 text-xl md:text-2xl font-semibold">All Products</h2>
                <Button text='Create Product' handleClick={() => navigate('/new-product')} />
            </div>
            <div className='text-end pb-2'>
                <Input type='text' name='search' value={search} handleChange={handleChange} placeHolder='Search Products' Icon={BiSearch} className='w-80!' />
            </div>
            <div>
                <Table
                    header={[
                        {
                            key: "futureImage", label: "Image", render: (value) => (
                                <img
                                    src={`${import.meta.env.VITE_API_BACKEND_URL}/images/${value}`}
                                    className='w-15 h-20 object-contain '
                                />
                            )
                        },
                        {
                            key: "title", label: "Name", render: (_, row) => (
                                <span>{row?.title.en}</span>
                            )
                        },
                        {
                            key: "category", label: "Category", render: (_, row) => (
                                <span>{row.category.name}</span>
                            )
                        },
                        {
                            key: "action", label: "Actions", render: (_, row) => (
                                <div className='flex items-center justify-center gap-2'>
                                    <MdPreview onClick={() => handlePreview(row)} className='cursor-pointer text-deep-walnut' size={25} />
                                    <FaEdit onClick={() => handleEdit(row)} className='cursor-pointer' size={25} />
                                    <MdDeleteOutline onClick={() => handleDelete(row)} className='text-red-700 cursor-pointer' size={25} />

                                </div>
                            )
                        },
                    ]}
                    body={filteredProducts}
                />
            </div>

            <ModelBox className='w-[95vw]! h-[95vh]! ' open={openModel} setOpen={setOpenModel}>
                <iframe
                    src={`${import.meta.env.VITE_API_FRONTEND_URL}/product/${preview}`}
                    width="100%"
                    height="500"
                    style={{ border: "none" }}
                ></iframe>
            </ModelBox>

        </Layout>
    )
}

export default Products