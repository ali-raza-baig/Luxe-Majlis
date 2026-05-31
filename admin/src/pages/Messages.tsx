
import { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/tables/Table'
import type { IMessage } from '../assets/types'
import axios from 'axios'

const Messages = () => {
    const [messages, setMessages] = useState<IMessage[]>([])

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/messages/get`)
            if (data.success) {
                setMessages(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <Layout>
            <div>
                <h2 className="py-2 text-xl md:text-2xl font-semibold">Recent Messages</h2>

                <Table
                    header={[
                        { key: "name", label: "Name" },
                        { key: "email", label: "Email" },
                        { key: "city", label: "City" },
                        { key: "phone", label: "Phone" },
                        { key: "message", label: "Message" },
                    ]}
                    body={messages}
                />

            </div>

        </Layout>
    )
}

export default Messages