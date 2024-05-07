'use client'
import React, { useEffect } from 'react'
import { Spoiler, Image, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Link from 'next/link';

const CarouselComponent = ({ movies }: { movies: any[] }) => {
    return (
        <Carousel
            withIndicators
            height={"auto"}
            slideSize={{ base: '100%', sm: '50%', md: '20%' }}
            slideGap={{ base: 0, sm: 'md' }}
            loop
            dragFree
            align="start"
        >
            {
                movies.map((movie, index) => (
                    <Carousel.Slide key={index}>
                        <Box className="space-y-2">
                            <Box className="w-full flex justify-center">
                                <Link href={`/movie/${movie.href}`}><Image src={movie.thumbnail} h={400} alt={movie.title} radius="md" className="hover:border-orange-400 hover:border-2" /></Link>
                            </Box>
                            <Box className="w-full text-center">
                                <p className="font-bold">{movie.title}</p>
                                <Spoiler maxHeight={75} showLabel="More..." hideLabel="Hide">
                                    {movie.extract}
                                </Spoiler>
                            </Box>
                        </Box>
                    </Carousel.Slide>
                ))
            }
        </Carousel>
    )
}

export default CarouselComponent