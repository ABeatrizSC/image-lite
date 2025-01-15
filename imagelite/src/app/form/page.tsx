'use client'

import { useState } from "react";
import { Button } from "@/components/Button";
import { InputText } from "@/components/input/InputText";
import { RenderIf, Template } from "@/components/Template";
import { useImageService } from "@/resources/image/image.service";
import { useFormik } from "formik";
import { FormProps, formScheme, formValidationScheme } from "./formScheme";
import Link from "next/link";
import { FieldError } from "@/components/input/FieldError";
import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import { useNotification } from "@/components/notification";

export default function FormPage() {

    const [imagePreview, setImagePreview] = useState<string>(); 
    const [loading, setLoading] = useState<boolean>(false);
    const service = useImageService();
    const notification = useNotification();

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    })

    async function handleSubmit(data: FormProps) {
        setLoading(true)
        const formData = new FormData;
        formData.append("file", data.file);
        formData.append("name", data.name);
        formData.append("tags", data.tags);

        await service.save(formData)

        formik.resetForm();
        setImagePreview('');
        setLoading(false);

        notification.notify('Upload sent successfully!', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files) {
            const file = event.target.files[0]
            formik.setFieldValue("file", file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center mx-5">
                    <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Add a new image</h5>
                    <form onSubmit={formik.handleSubmit} className="w-full max-w-96">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="col-span-full flex flex-col gap-x-6 gap-y-8">
                                    <div className="sm:col-span-6">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 mb-1">
                                            Name:
                                        </label>
                                        <InputText id="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Type the image's name" style="w-full" />
                                        <FieldError error={formik.errors.name} />
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 mb-1">
                                            Tags:
                                        </label>
                                        <InputText id="tags" onChange={formik.handleChange} value={formik.values.tags} placeholder="Type the tags comma separated" style="w-full" />
                                        <FieldError error={formik.errors.tags} />
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                            Image:
                                        </label>
                                        <div className="mt-2 min-h-40 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                                            <div className="text-center max-h-min">
                                                <div className="flex text-sm/6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer font-semibold text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                                    >
                                                        <RenderIf condition={!imagePreview}>
                                                            <span>Upload a image</span>
                                                        </RenderIf>
                                                        <RenderIf condition={!!imagePreview}>
                                                            <img src={imagePreview} alt="" className="cursor-pointer rounded-lg object-cover w-full h-full"/>
                                                        </RenderIf>
                                                        <input onChange={onFileUpload} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <RenderIf condition={!imagePreview}>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </RenderIf>
                                                </div>
                                                <RenderIf condition={!imagePreview}>
                                                    <p className="block text-xs/5 text-gray-600">PNG, JPEG or GIF</p>
                                                </RenderIf>
                                            </div>
                                        </div>
                                        <FieldError error={formik.errors.file} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link href='/galery'>
                                    <Button label="Cancel" type="button" style="bg-red-500 text-sm/6 text-gray-900 hover:bg-red-400"/>
                                </Link>
                                <Button label="Save" type="submit" style="bg-indigo-950 hover:bg-indigo-900"/>
                            </div>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}