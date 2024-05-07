'use client'
import { Box, Divider, Grid, Image, List } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MovieDetailComponent = ({ movieId }: { movieId: number | null }) => {
    const [movieData, setMovieData] = useState<any>()
    const getMovieData = async (movieId: number) => {
        if (movieId !== null) {
            await axios.get(process.env.NEXT_PUBLIC_API + "/movie/" + movieId)
                .then(response => {
                    if (response.data.ok) {
                        setMovieData(response.data.movie)
                    } else {
                        console.log(response.data.error)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        if (movieId !== null) {
            getMovieData(movieId)
        }
    }, [movieId])
    return (
        <Box>
            <Divider mb={20} />
            {
                movieData &&
                <Grid>
                    <Grid.Col span={4}><Image src={movieData.thumbnail} radius="md" /></Grid.Col>
                    <Grid.Col span={8}>
                        <List listStyleType="none" className="space-y-2">
                            <List.Item><span className="font-bold mr-2">Title:</span>{movieData.title}</List.Item>
                            <List.Item><span className="font-bold mr-2">Extract:</span>{movieData.extract}</List.Item>
                            <List.Item><span className="font-bold mr-2">Year:</span>{movieData.year}</List.Item>
                            <List.Item>
                                <span className="font-bold mr-2">Cast:</span>
                                <List withPadding listStyleType="none">
                                    {
                                        movieData.cast.map((cast: string, index: number) => (
                                            <List.Item key={index}>{cast}</List.Item>
                                        ))
                                    }
                                </List>
                            </List.Item>
                            <List.Item>
                                <span className="font-bold mr-2">Genres:</span>
                                <List withPadding listStyleType="none">
                                    {
                                        movieData.genres.map((cast: string, index: number) => (
                                            <List.Item key={index}>{cast}</List.Item>
                                        ))
                                    }
                                </List>
                            </List.Item>
                        </List>
                    </Grid.Col>
                </Grid>
            }
        </Box>
    )
}

export default MovieDetailComponent