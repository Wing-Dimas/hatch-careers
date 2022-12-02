import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Navbar";
import moment from "moment/moment";
import { IconClockHour3, IconMapPin, IconPremiumRights } from "@tabler/icons";
import parse from "html-react-parser";

const CatalogDetail = (props) => {
  const job = props.job;
  return (
    <>
      <Head title={props.title} />
      <Navbar />
      <div className="sm:px-8 md:px-32 px-4 py-8 grid">
        <div key={job.id} className="p-6 shadow-lg my-2 rounded-sm">
          <div className="flex justify-between">
            <h2 className="text-blue1 text-2xl font-semibold">{job.title}</h2>
            {job.status == "open" && (
              <Link
                href={`/apply/${job.id}`}
                method="get"
                as="button"
                className="flex justify-center items-center px-2 rounded-sm  bg-yellow font-semibold text-[#fff] hover:shadow-md"
              >
                Apply Now
              </Link>
            )}
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
        </div>
        <div className="p-6 shadow-lg my-2 rounded-sm detail-catalog">
          <h2 className="text-xl font-bold mb-2">Description:</h2>
          <p className="test-sm">{parse(job.description)} </p>

          <h2 className="text-xl font-bold mb-2 mt-4">Skills:</h2>
          <p className="text-sm">{parse(job.skill)} </p>

          <h2 className="text-xl font-bold mb-2 mt-4">Qualifications:</h2>
          <p className="text-sm">{parse(job.qualifications)} </p>
        </div>
      </div>
    </>
  );
};

export default CatalogDetail;
