import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Navbar";
import moment from "moment/moment";
import { Inertia } from "@inertiajs/inertia";
import { data } from "autoprefixer";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";

const Create = (props) => {
    const job = props.job;

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const [spinner, setSpinner] = useState(false);

    const handleSubmit = () => {
        setSpinner(true);
        axios
            .post(`/apply/${job.id}`, {
                email,
                name,
                mobile_number: mobileNumber,
                // job_id: job.id,
            })
            .then((res) => {
                Swal.fire({
                    title: "Berhasil",
                    text: "Terima kasih telah melamar di perusahaan kami, kami akan segera menghubungi anda",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
            })
            .catch((res) => {
                Swal.fire({
                    title: "Gagal",
                    text: "Anda sudah melamar perkerjaan ini",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            })
            .finally(() => {
                setSpinner(false);
                setEmail("");
                setName("");
                setMobileNumber("");
            });
    };
    return (
        <div>
            <Navbar />
            <Head title={props.title} />

            <div className="lg:flex justify-between items-center px-4 sm:px-8 md:px-32 py-16">
                <div className="text-center">
                    <h1 className="text-5xl text-blue1 font-bold">
                        Apply This Job
                    </h1>
                    <h2 className="text-3xl my-2">"{job.title}"</h2>
                    <p className="text-sm text-[#888]">
                        We'll never share your data with anyone else.
                    </p>
                </div>
                <div className="lg:w-96 lg:mt mt-8">
                    <div className="grid mb-4 w-full">
                        <label
                            htmlFor="email-address"
                            className="text-blue1 font-semibold"
                        >
                            Email Address*
                        </label>
                        <input
                            type="email"
                            id="email-address"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-full border-gray-400 w-full lg:w-5/6"
                        />
                    </div>
                    <div className="grid mb-4 w-full">
                        <label
                            htmlFor="name"
                            className="text-blue1 font-semibold"
                        >
                            Full Name*
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-full border-gray-400 w-full lg:w-5/6"
                        />
                    </div>
                    <div className="grid mb-4 w-full">
                        <label
                            htmlFor="subject"
                            className="text-blue1 font-semibold"
                        >
                            Mobile Phone*
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Example: 81259967123"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="rounded-full border-gray-400 w-full lg:w-5/6"
                        />
                    </div>
                    <div className="grid mb-4">
                        <button
                            type="submit"
                            className="rounded-full w-full lg:w-5/6 text-white font-semibold bg-yellow py-4"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {spinner ? (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#000]/50 flex justify-center items-center">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                        ]}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Create;
