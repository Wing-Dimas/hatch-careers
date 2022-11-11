import React, { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import hero from "@/assets/hero.jpg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="sm:flex gap-8 bg-[#fff] pr-4 sm:pr-8 md:pr-18 ">
            <div
                className="flex-col whitespace-nowrap justify-center w-full bg-no-repeat bg-center bg-cover object-fit overflow-hidden hidden sm:flex md:pl-4 lg:pl-32"
                style={{ backgroundImage: `url(${hero})` }}
            >
                <h1 className="text-blue1 font-bold sm:text-xl md:text-5xl">
                    Keep the <span className="text-yellow">spirit</span>
                </h1>
                <p className="font-semibold text-blue1 sm:text-sm md:text-xl mt-2">
                    Do you work with the best plan
                </p>
            </div>
            <GuestLayout className="-">
                <Head title="Log in" />
                <p className="text-center mt-8 mb-4">
                    please login below to start your work
                </p>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel forInput="email" value="Email" />

                        <TextInput
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2 text-red"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="password" value="Password" />

                        <TextInput
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-red"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <PrimaryButton
                        className="ml-4 mt-4"
                        processing={processing}
                    >
                        Log in
                    </PrimaryButton>
                </form>
            </GuestLayout>
        </div>
    );
}
