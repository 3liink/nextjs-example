'use client'
import { Box, Title, Drawer, Button, Image, Spoiler, Group, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useMemo, useState } from 'react'
import AddMovieComponent from './AddMovieComponent';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { IconCirclePlus, IconEdit, IconFileInfo, IconTrash } from '@tabler/icons-react';
import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import MovieDetailComponent from './MovieDetailComponent';
import EditMovieComponent from './EditMovieComponent';
import { useSession } from 'next-auth/react';

const ManagementPage = () => {
    const { data: session } = useSession()
    const [dataFromChild, setDataFromChild] = useState<boolean>(false);
    const [addOpened, addHandlers] = useDisclosure(false);
    const [infoOpened, infoHandlers] = useDisclosure(false);
    const [editOpened, editHandlers] = useDisclosure(false);
    const [movieData, setMovieData] = useState<any[]>([])
    const [movieInfo, setMovieInfo] = useState<number | null>(null)
    const [editMovie, setEditMovie] = useState<number | null>(null)

    const getMovieData = async () => {
        await axios.get(process.env.NEXT_PUBLIC_API + "/movies")
            .then((response) => {
                if (response.data.ok) {
                    setMovieData(response.data.movies)
                } else {
                    console.log(response.data.error)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'thumbnail',
                header: "Poster",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => (
                    <Image src={cell.getValue()} h={100} w="auto" radius="sm" />
                )
            },
            {
                accessorKey: 'title',
                header: "Title",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => cell.getValue()
            },
            {
                accessorKey: 'extract',
                header: "Extract",
                grow: false,
                size: 250,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => (
                    <Spoiler maxHeight={60} showLabel="Show more" hideLabel="Hide">
                        {cell.getValue()}
                    </Spoiler>
                )
            },
            {
                accessorKey: 'year',
                header: "Year",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => cell.getValue()
            },
            {
                accessorKey: 'cast',
                header: "Cast",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => cell.getValue().join(", ")
            },
            {
                accessorKey: 'genres',
                header: "Genres",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => cell.getValue().join(", ")
            },
            {
                accessorKey: 'id',
                header: "Actions",
                grow: false,
                size: 50,
                muiTableHeadCellProps: { style: { color: 'green' } },
                Cell: ({ cell }: { cell: any }) => (
                    <Group>
                        <ActionIcon variant="filled" aria-label="Info" onClick={() => {
                            setMovieInfo(cell.getValue())
                            infoHandlers.open()
                        }}>
                            <IconFileInfo size={25} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="filled" bg="yellow" aria-label="Edit" onClick={() => {
                            setEditMovie(cell.getValue())
                            editHandlers.open()
                        }}>
                            <IconEdit size={25} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="filled" bg="red" aria-label="Delete" onClick={() => handleDeleteMovie(cell.getValue())}>
                            <IconTrash size={25} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                )
                // cell.getValue()
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: movieData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    });

    const receiveDataFromChild = (data: boolean) => {
        if (data) {
            setDataFromChild(true)
            addHandlers.close()
            editHandlers.close()
        } else {
            console.log('show in false parent: ' + data)
        }
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleDeleteMovie = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            
            if (result.isConfirmed) {
                await axios.delete(process.env.NEXT_PUBLIC_API + "/delete-movie/" + id, {
                    headers: {
                        token: session?.user.serverToken
                    }
                })
                .then(response => {
                    if (response.data.ok) {
                        setDataFromChild(true)
                        Toast.fire({
                            icon: "success",
                            title: "Delete movie successfully."
                        });
                    } else {
                        console.log(response.data.error)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        });
    }

    useEffect(() => {
        getMovieData()
        if (dataFromChild) {
            setDataFromChild(false)
        }
    }, [dataFromChild])

    return (
        <Box className="space-y-4">
            <Title order={4}>Management</Title>
            <Button leftSection={<IconCirclePlus size={20} />} onClick={addHandlers.open} bg="teal">Add new movie</Button>

            <ThemeProvider theme={createTheme({
                typography: {
                    fontFamily: "Bai Jamjuree, sans-serif"
                }
            })}>
                <MaterialReactTable table={table} />
            </ThemeProvider>

            {/* Drawer */}
            <Drawer opened={addOpened} onClose={addHandlers.close} size="lg" position="right" title={<Title order={4}>Add movie</Title>}>
                <AddMovieComponent sendDataToParent={receiveDataFromChild} />
            </Drawer>
            <Drawer opened={infoOpened} onClose={infoHandlers.close} size="xl" position="right" title={<Title order={4}>Movie detail</Title>}>
                <MovieDetailComponent movieId={movieInfo} />
            </Drawer>
            <Drawer opened={editOpened} onClose={editHandlers.close} size="lg" position="right" title={<Title order={4}>Edit movie</Title>}>
                <EditMovieComponent sendDataToParent={receiveDataFromChild} movieId={editMovie} />
            </Drawer>
        </Box>
    )
}

export default ManagementPage