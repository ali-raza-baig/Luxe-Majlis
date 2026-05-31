import axios from "axios"
import DashboardCard from "../components/cards/DashboardCard"
import Layout from "../components/Layout/Layout"
import Table from "../components/tables/Table"
import { useEffect, useState } from "react"
import type { IMessage } from "../assets/types"


const Home = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/messages/get?fromDate=${sevenDaysAgo.toISOString()}&toDate=${today.toISOString()}`)
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
            <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-3 gap-2">
                <div className="col-span-1">
                    <DashboardCard />
                </div>
                <div className="col-span-1">
                    <DashboardCard />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <DashboardCard />
                </div>
            </div>
            {/* Recent Messages */}
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

export default Home