import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Navbar";
import moment from "moment/moment";
import { IconClockHour3, IconMapPin, IconPremiumRights } from "@tabler/icons";
import parse from "html-react-parser";

const Catalog = (props) => {
  const jobs = props.jobs;

  return (
    <>
      <Head title={props.title} />
      <Navbar />

      <ul className="sm:px-8 md:px-32 px-4 py-8 grid">
        {jobs.map((job) => (
          <li key={job.id} className="p-6 shadow-lg my-2 rounded-sm">
            <div className="flex justify-between">
              <h2 className="text-blue1 text-2xl font-semibold">{job.title}</h2>
              <span
                className={`flex px-2 max-w-max rounded-full text-sm text-[#fff] font-medium ${
                  job.status == "open" ? "bg-green" : "bg-red"
                }`}
              >
                Job {job.status == "open" ? "open" : "closed"}
              </span>
            </div>
            <p className="text-sm mt-2 mb">
              Apply before {moment(new Date(job.close_on)).format("L")}
            </p>
            <ul>
              <li className="flex items-center font-bold">
                <IconMapPin size={16} /> {job.location}
              </li>
              <li className="flex items-center font-bold">
                <IconPremiumRights size={16} /> Rp{" "}
                {job.salary.toLocaleString("id-ID").replace(".", ",")}
                ,00
              </li>
              <li className="flex items-center font-bold">
                <IconClockHour3 size={16} /> {job.job_type}
              </li>
            </ul>
            <p>
              {job.description.length > 200
                ? parse(job.description.slice(0, 200) + "</p>")
                : parse(job.description)}{" "}
              <a
                href={`/job-list/${job.id}`}
                className="text-blue2 font-semibold"
              >
                ... Read More
              </a>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Catalog;
