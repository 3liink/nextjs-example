'use client'
import { Box, Loader, Title, TextInput, Checkbox, Button, Group, Image, SimpleGrid, Text, rem, Textarea, Select, TagsInput, Divider } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useSession } from 'next-auth/react';

type FormValueType = {
    title: string
    extract: string
    files: any[]
    year: string
    cast: string[]
    genres: string[]
}

const EditMovieComponent = ({ sendDataToParent, movieId }: { sendDataToParent: (val: boolean) => void, movieId: number | null }) => {
    const { data: session } = useSession()
    const [filesArr, setFilesArr] = useState<FileWithPath[]>([]);
    const [yearData, setYearData] = useState<string>('')
    const [castData, setCastData] = useState<string[]>([])
    const [genresData, setGenresData] = useState<string[]>([])
    const [thumbnailDefault, setThumbnailDefault] = useState<string>("")

    const previews = filesArr.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} radius="sm" />;
    });

    const initialAsyncValues = async () => {
        await axios.get(process.env.NEXT_PUBLIC_API + "/movie/" + movieId)
            .then((response) => {
                form.setValues(response.data.movie)
                setYearData(response.data.movie.year)
                setCastData(response.data.movie.cast)
                setGenresData(response.data.movie.genres)
                setThumbnailDefault(response.data.movie.thumbnail)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            extract: '',
            files: [],
            year: '',
            cast: [],
            genres: [],
        },

        validate: {
            title: (value: string) => (value.length < 1 ? "Please enter a title." : null),
            extract: (value: string) => (value.length < 1 ? "Please enter a extract." : null),
            year: (value: string) => (value.length < 1 ? "Please enter a year." : null),
            cast: (value: string[]) => (value.length < 1 ? "Please enter a cast." : null),
            genres: (value: string[]) => (value.length < 1 ? "Please enter a genres." : null),
        },
    });

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

    const handleFormSubmit = async (values: FormValueType) => {

        const token = session?.user.serverToken

        const formData = new FormData()
        formData.append("token", token as string)
        formData.append("title", values.title)
        formData.append("extract", values.extract)
        formData.append("year", yearData)
        castData.forEach((element, index) => {
            formData.append(`cast[${index}]`, element);
        });
        genresData.forEach((element, index) => {
            formData.append(`genres[${index}]`, element);
        });
        formData.append("href", ((values.title).split(" ").join("_")) + "_(" + yearData + "_film)")
        formData.append("folder", "/poster/")        

        if (values.files.length > 0) {
            const getFileExtension = (values.files[0].name).split('.').pop();
            const posterName = ((values.title).split(" ").join("_")) + "_" + yearData + "_Poster." + getFileExtension;
            formData.append("thumbnail", process.env.NEXT_PUBLIC_API + "/images/poster/" + posterName)
            formData.append("image", values.files[0], posterName)
            formData.append("filename", posterName)
        } else {
            formData.append("filename", "null")
        }

        await axios.put(process.env.NEXT_PUBLIC_API + "/edit-movie/" + movieId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                console.log(response.data)
                Toast.fire({
                    icon: "success",
                    title: "Add movie successfully."
                });
                sendDataToParent(true);
            })
            .catch(err => {
                console.log(err)
            })
        // console.log(values)

    }

    const sendData = async (data: boolean) => {
        sendDataToParent(data);
    };

    useEffect(() => {
        initialAsyncValues()
    }, [movieId])
    return (
        <Box>
            <Divider mb={20} />
            <Box maw={600}>
                <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))} className="space-y-4">
                    <TextInput
                        withAsterisk
                        label="Title"
                        placeholder="Title"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        withAsterisk
                        label="Extract"
                        placeholder="Extract"
                        key={form.key('extract')}
                        rows={10}
                        {...form.getInputProps('extract')}
                    />

                    <Select
                        withAsterisk
                        label="Year"
                        placeholder="Year"
                        data={['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']}
                        value={yearData}
                        onChange={setYearData as any}
                        allowDeselect={false}
                        // {...form.getInputProps('year')}
                    />

                    <TagsInput
                        withAsterisk
                        label="Cast"
                        placeholder="Cast (Press enter for submit tags)"
                        value={castData}
                        onChange={setCastData}
                    // {...form.getInputProps('cast')}
                    />

                    <TagsInput
                        withAsterisk
                        label="Genres"
                        placeholder="Genres"
                        data={['Action', 'Drama', 'Comedy', 'Horror', 'Supernatural', 'Science Fiction', 'Crime', 'Mystery', 'Triller', 'Adventure', 'Fantasy', 'Superhero']}
                        value={genresData}
                        onChange={setGenresData}
                    // {...form.getInputProps('genres')}
                    />

                    <Box>
                        {
                            filesArr.length > 0
                                ? previews
                                : <Image src={thumbnailDefault} radius="sm" />
                        }
                    </Box>

                    <Box>
                        <Dropzone
                            onDrop={(files) => {
                                setFilesArr(files);
                                form.setFieldValue("files", files as any);
                            }}
                            // onDrop={(files) => console.log('accepted files', files)}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            multiple={false}
                            {...form.getInputProps('files')}
                        >
                            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                    </Box>

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                        <Button type="button" variant="outline" color="yellow" onClick={() => sendData(true)}>Cancel</Button>
                    </Group>
                </form>
            </Box>
        </Box>
    )
}

export default EditMovieComponent