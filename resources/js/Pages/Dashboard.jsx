import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { IconChevronsRight, IconNews, IconUsers } from "@tabler/icons";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-3">
                    {/* JOBS */}
                    <div className="flex flex-1 bg-[#fff] gap-3 p-2 rounded-md shadow-md">
                        <div className="bg-blue2 p-3 rounded-md">
                            <IconNews color="#fff" size={32} />
                        </div>
                        <div className="grid">
                            <h3 className="flex items-center gap-1">
                                <span>Jobs</span>
                                <Link
                                    href={route("jobs")}
                                    as="a"
                                    className="flex items-center text-sm text-blue2"
                                >
                                    more{" "}
                                    <IconChevronsRight
                                        size={12}
                                        className="text-blue2"
                                    />
                                </Link>
                            </h3>
                            <p className="font-bold">4 open, 5 closed</p>
                        </div>
                    </div>
                    {/* END JOBS */}
                    {/* APPLICANTS */}
                    <div className="flex flex-1 bg-[#fff] gap-3 p-2 rounded-md shadow-md">
                        <div className="bg-red p-3 rounded-md">
                            <IconUsers color="#fff" size={32} />
                        </div>
                        <div className="grid">
                            <h3 className="flex items-center gap-1">
                                <span>Applicants</span>
                                <Link
                                    href={route("applicants")}
                                    as="a"
                                    className="flex items-center text-sm text-blue2"
                                >
                                    more{" "}
                                    <IconChevronsRight
                                        size={12}
                                        className="text-blue2"
                                    />
                                </Link>
                            </h3>
                            <p className="font-bold">3</p>
                        </div>
                    </div>
                    {/* END APPLICANTS */}
                    {/* USERS */}
                    <div className="flex flex-1 bg-[#fff] gap-3 p-2 rounded-md shadow-md">
                        <div className="bg-yellow p-3 rounded-md">
                            <IconUsers color="#222" size={32} />
                        </div>
                        <div className="grid">
                            <h3 className="flex items-center gap-1">
                                <span>Users</span>
                                <Link
                                    href={route("users")}
                                    as="a"
                                    className="flex items-center text-sm text-blue2"
                                >
                                    more{" "}
                                    <IconChevronsRight
                                        size={12}
                                        className="text-blue2"
                                    />
                                </Link>
                            </h3>
                            <p className="font-bold">12</p>
                        </div>
                    </div>
                    {/* END USERS */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
