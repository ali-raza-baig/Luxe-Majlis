import Category from '@/components/pages/Category'
import { Metadata } from 'next'
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const category = `${slug}`

    return {
        title: 'Top Curtains',
        description: '',
        keywords: [],
        alternates: { canonical: `https://mysite.com/product/${slug}` }
    }
}

const page = async ({ params }: Props) => {
    const { slug } = await params;
    return (
        <div>
            <Category slug={slug} />
        </div>
    )
}

export default page