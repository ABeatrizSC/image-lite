'use client'

import { Button } from "@/components/Button";
import { InputText } from "@/components/input/InputText";
import { RenderIf, Template } from "@/components/Template"
import { useFormik } from "formik";
import { useState } from "react"
import { formScheme, LoginForm, validationScheme } from "./formScheme";
import { FieldError } from "@/components/input/FieldError";
import { AccessToken, Credentials, User } from "@/resources/user/user.resource";
import { useAuth } from "@/resources/user/authentication.service";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/notification";

export default function Login(){

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);
    const auth = useAuth();
    const router = useRouter();
    const notification = useNotification();

    const formik = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm){

        setLoading(true)

        if (!newUserState){
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push("/galery")
            } catch (error: any){
                const message = error?.message;
                notification.notify(message, 'error');
            }
        } else {
            const user: User = { email: values.email, name: values.name, password: values.password }

            try {
                await auth.save(user);
                notification.notify('success on saving user!', 'success');
                formik.resetForm();
                setNewUserState(false);
            } catch(error: any) {
                const message = error?.message;
                notification.notify(message, 'error');
            }
        }

        setLoading(false)
    }

    return(
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {newUserState ? "Register an account" : "Login to your account"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <InputText
                                        id="name"
                                        style="w-full"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    <FieldError error={formik.errors.name}/>
                                </div>
                            </div>
                        </RenderIf>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <InputText
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    style="w-full"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <FieldError error={formik.errors.email}/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <InputText
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    style="w-full"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <FieldError error={formik.errors.password}/>
                            </div>
                        </div>
                        
                        <RenderIf condition={newUserState}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Repeat password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <InputText
                                        id="passwordMatch"
                                        type="password"
                                        style="w-full"
                                        value={formik.values.passwordMatch}
                                        onChange={formik.handleChange}
                                    />
                                    <FieldError error={formik.errors.passwordMatch}/>
                                </div>
                            </div>
                        </RenderIf>

                        <div>
                            <RenderIf condition={!newUserState}>
                                <Button
                                    type="submit"
                                    style="w-full bg-indigo-950 hover:bg-indigo-900"
                                    label="Login"
                                />
                            </RenderIf>
                            <RenderIf condition={newUserState}>
                                <Button
                                    type="submit"
                                    style="w-full bg-indigo-950 hover:bg-indigo-900"
                                    label="Register"
                                />
                            </RenderIf>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        <RenderIf condition={!newUserState}>
                            Don't have an account yet?{' '}
                            <a href="#" className="font-semibold text-indigo-950 hover:text-indigo-900" onClick={() => setNewUserState(true)}>
                                Sign In
                            </a>
                        </RenderIf>
                        <RenderIf condition={newUserState}>
                            Already have an account?{' '}
                            <a href="#" className="font-semibold text-indigo-950 hover:text-indigo-900" onClick={() => setNewUserState(false)}>
                                Login
                            </a>
                        </RenderIf>
                    </p>
                </div>
            </div>
        </Template>
    )
}