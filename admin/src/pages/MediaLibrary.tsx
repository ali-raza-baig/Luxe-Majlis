import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/tables/Table'
import Input from '../components/forms/Input'
import { BiSearch } from 'react-icons/bi'
import Button from '../components/buttons/Button'
import ModelBox from '../components/ModelBox'

const MediaLibrary = () => {
    const [search, setSearch] = useState('')
    const handleChange = (e: any) => {
        setSearch(e?.target.value)
    }

    const [openModel, setOpenModel] = useState(false);


    return (
        <Layout>
            <div className='flex items-center justify-between pb-2'>
                <h2 className="py-2 text-xl md:text-2xl font-semibold">Media Managment</h2>
                <Button text='Upload Media' handleClick={() => setOpenModel(!openModel)} />
            </div>
            <div className='text-end pb-2'>
                <Input type='text' name='search' value={search} handleChange={handleChange} placeHolder='Search Images' Icon={BiSearch} className='w-80!' />
            </div>
            <div>
                <Table
                    header={[
                        { key: "name", label: "Name" },
                        { key: "email", label: "Email" },
                    ]}
                    body={[
                        {
                            name: "Ali",
                            email: "ali@gmail.com",
                            status: "Active",
                        },
                        {
                            name: "Ahmed",
                            email: "ahmed@gmail.com",
                            status: "Inactive",
                        },
                    ]}
                />
            </div>

            {/* Model Box */}
            <div>
                <ModelBox open={openModel} setOpen={setOpenModel} >
                    d
                </ModelBox>
            </div>
        </Layout>
    )
}


export default MediaLibrary