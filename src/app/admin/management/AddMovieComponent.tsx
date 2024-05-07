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

const AddMovieComponent = ({ sendDataToParent }: { sendDataToParent: (val: boolean) => void }) => {
    const { data: session } = useSession()
    const [filesArr, setFilesArr] = useState<FileWithPath[]>([]);

    const previews = filesArr.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} radius="sm" />;
    });

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

        if (values.files.length > 0) {
            const getFileExtension = (values.files[0].name).split('.').pop();
            const posterName = ((values.title).split(" ").join("_")) + "_" + values.year + "_Poster." + getFileExtension;

            const token = session?.user.serverToken

            const formData = new FormData()
            formData.append("token", token as string)
            formData.append("title", values.title)
            formData.append("extract", values.extract)
            formData.append("year", values.year)
            values.cast.forEach((element, index) => {
                formData.append(`cast[${index}]`, element);
            });
            values.genres.forEach((element, index) => {
                formData.append(`genres[${index}]`, element);
            });
            formData.append("thumbnail", process.env.NEXT_PUBLIC_API + "/images/poster/" + posterName)
            formData.append("href", ((values.title).split(" ").join("_")) + "_(" + values.year + "_film)")
            formData.append("folder", "/poster/")
            formData.append("image", values.files[0], posterName)
            formData.append("filename", posterName)

            await axios.post(process.env.NEXT_PUBLIC_API + "/add-movie", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                // onUploadProgress: (progressEvent) => {
                //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                //     setUploadProgress(progress)
                // },
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
        } else {
            Toast.fire({
                icon: "error",
                title: "Please provide image on this movie."
            });
        }

    }

    const sendData = async (data: boolean) => {
        sendDataToParent(data);
    };

    useEffect(() => {
    }, [])
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
                        {...form.getInputProps('year')}
                    />

                    <TagsInput
                        withAsterisk
                        label="Cast"
                        placeholder="Cast (Press enter for submit tags)"
                        {...form.getInputProps('cast')}
                    />

                    <TagsInput
                        withAsterisk
                        label="Genres"
                        placeholder="Genres"
                        data={['Action', 'Drama', 'Comedy', 'Horror', 'Supernatural', 'Science Fiction', 'Crime', 'Mystery', 'Triller', 'Adventure', 'Fantasy', 'Superhero']}
                        {...form.getInputProps('genres')}
                    />

                    <Box>
                        {previews}
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
                        <Button type="button" onClick={() => sendData(true)}>test</Button>
                    </Group>
                </form>
            </Box>
        </Box>
    )
}

export default AddMovieComponent