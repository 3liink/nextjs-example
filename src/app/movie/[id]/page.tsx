import type { Metadata, ResolvingMetadata } from "next";
import AppShellWithoutSidebarLayout from '@/layouts/AppShellWithoutSidebarLayout'
import axios from 'axios'
import React from 'react'
import { Breadcrumbs, Anchor, Box, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import MovieDetailComponent from './MovieDetailComponent';

const items = [
    { title: 'Home', href: '/' },
    // { title: 'Movies list', href: '/movies' },
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const movieData = await axios.get(process.env.NEXT_PUBLIC_API + "/movies").then(response => (response?.data.movies).find((obj: any) => obj["href"] === params.id))

    const previousImages = (await parent).openGraph?.images || []

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
        title: "3liink - " + movieData.title,
        description: movieData.extract,
        openGraph: {
            images: [movieData.thumbnail, ...previousImages],
        },
    }
}

async function MovieDetailPage({ params }: Props) {
    const movieData = await axios.get(process.env.NEXT_PUBLIC_API + "/movies").then(response => (response?.data.movies).find((obj: any) => obj["href"] === params.id))
    return (
        <AppShellWithoutSidebarLayout>
            <Breadcrumbs>
                {items}
                <Box>
                    {movieData.title}
                </Box>
            </Breadcrumbs>
            <div className="py-8">
                <MovieDetailComponent movieData={movieData} />
            </div>
        </AppShellWithoutSidebarLayout>
    )
}

export default MovieDetailPage