'use client'
import React, { useEffect } from 'react'
import { Card, Image, Text, Badge, Button, Group, Container, Flex, Box, Anchor } from '@mantine/core';
import Link from 'next/link';

const MovieDetailComponent = ({ movieData }: { movieData: any }) => {
    return (
        <Container className="space-y-4">

            <Flex justify="center">
                <Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
                    <Card.Section>
                        <Image
                            src={movieData.thumbnail}
                            height={400}
                            alt={movieData.href}
                        />
                    </Card.Section>
                </Card>
            </Flex>

            <Card shadow="sm" padding="lg" radius="md" withBorder className="space-y-4">

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={600} c="indigo">{movieData.title}</Text>
                    <Group>
                        {
                            movieData.genres.map((genre: string, index: number) => <Badge color="pink" key={index}>{genre}</Badge>)
                        }

                    </Group>
                </Group>

                <Box>
                    <Text size="sm" c="teal">Extract:</Text>
                    <Text size="sm">{movieData.extract}</Text>
                </Box>

                <Box>
                    <Text size="sm" c="teal">Year:</Text>
                    <Text size="sm">{movieData.year}</Text>
                </Box>

                <Box className="space-x-2">
                    <Text size="sm" c="teal">Cast:</Text>
                    {
                        movieData.cast.map((cast: string) => (
                            <Anchor>{cast}</Anchor>
                        ))
                    }
                </Box>

                <Button color="blue" fullWidth mt="md" radius="md" component={Link} href="/">
                    Back to Movies list.
                </Button>
            </Card>

        </Container>
    )
}

export default MovieDetailComponent